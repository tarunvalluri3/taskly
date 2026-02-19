import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { getTodos } from "../services/api";
import { useToast } from "../context/ToastContext";
import {
  BarChart3,
  PieChart,
  BarChart2,
  TrendingUp,
  AlertCircle,
  Trash2,
  Activity,
} from "lucide-react";

import KpiCard from "../components/dashboard/KpiCard";
import StatusDonut from "../components/dashboard/StatusDonut";
import PriorityBar from "../components/dashboard/PriorityBar";
import CompletionKpi from "../components/dashboard/CompletionKpi";
import FailureReasonBar from "../components/dashboard/FailureReasonBar";
import DeleteReasonBar from "../components/dashboard/DeleteReasonBar";
import TrendLine from "../components/dashboard/TrendLine";
import DashboardSkeleton from "../components/DashboardSkeleton";
import DashboardErrorState from "../components/dashboard/DashboardErrorState";
import EmptyState from "../components/EmptyState";
import RangeSelector from "../components/dashboard/RangeSelector";
import ChartCard from "../components/dashboard/ChartCard";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rangeDays, setRangeDays] = useState(7);
  const didRun = useRef(false);
  const { show } = useToast();

  const [stats, setStats] = useState({});
  const [priorityData, setPriorityData] = useState([]);
  const [failureReasonData, setFailureReasonData] = useState([]);
  const [deleteReasonData, setDeleteReasonData] = useState([]);
  const [trendData, setTrendData] = useState([]);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const [currentRes, completedRes, missedRes, deletedRes] =
        await Promise.all([
          getTodos("current"),
          getTodos("completed"),
          getTodos("incomplete"),
          getTodos("deleted"),
        ]);

      const currentTodos = currentRes.data;
      const completedTodos = completedRes.data;
      const missedTodos = missedRes.data;
      const deletedTodos = deletedRes.data;

      const allTodos = [
        ...currentTodos,
        ...completedTodos,
        ...missedTodos,
        ...deletedTodos,
      ];

      const current = currentTodos.length;
      const completed = completedTodos.length;
      const missed = missedTodos.length;
      const deleted = deletedTodos.length;
      const total = allTodos.length;

      const completionRate =
        completed + missed === 0
          ? 0
          : Math.round((completed / (completed + missed)) * 100);

      const priorityCount = allTodos.reduce(
        (acc, t) => {
          acc[t.priority] = (acc[t.priority] || 0) + 1;
          return acc;
        },
        { high: 0, medium: 0, low: 0 },
      );

      setPriorityData([
        { name: "High", value: priorityCount.high },
        { name: "Medium", value: priorityCount.medium },
        { name: "Low", value: priorityCount.low },
      ]);

      const failureCount = missedTodos.reduce((acc, t) => {
        const key = t.failureReason?.trim() || "No reason";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      setFailureReasonData(
        Object.entries(failureCount)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 6),
      );

      const deleteCount = deletedTodos.reduce((acc, t) => {
        const key = t.deleteReason?.trim() || "No reason";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      setDeleteReasonData(
        Object.entries(deleteCount)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 6),
      );

      const days = [...Array(rangeDays)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (rangeDays - 1 - i));
        const key = d.toISOString().slice(5, 10);
        return { key, label: key, created: 0, completed: 0, missed: 0 };
      });

      const map = Object.fromEntries(days.map((d) => [d.key, d]));

      allTodos.forEach((t) => {
        const day = new Date(t.createdAt).toISOString().slice(5, 10);
        if (!map[day]) return;
        map[day].created += 1;
        if (t.status === "completed") map[day].completed += 1;
        if (t.status === "incomplete") map[day].missed += 1;
      });

      setTrendData(
        days.map((d) => ({
          day: d.label,
          created: map[d.key].created,
          completed: map[d.key].completed,
          missed: map[d.key].missed,
        })),
      );

      setStats({
        total,
        current,
        completed,
        incomplete: missed,
        deleted,
        completionRate,
      });

      if (!didRun.current) {
        show("Dashboard loaded", "info");
        didRun.current = true;
      }
    } catch {
      setError(true);
      show("Dashboard load failed", "error");
    } finally {
      setLoading(false);
    }
  }, [rangeDays, show]);

  useEffect(() => {
    if (!user) {
      // clear stale data on logout
      setStats({});
      setPriorityData([]);
      setFailureReasonData([]);
      setDeleteReasonData([]);
      setTrendData([]);
      return;
    }

    loadStats();
  }, [user, loadStats]);

  /* ---------- MEMOIZED DATA ---------- */

  const donutData = useMemo(
    () => [
      { name: "Active", value: stats.current },
      { name: "Completed", value: stats.completed },
      { name: "Missed", value: stats.incomplete },
      { name: "Deleted", value: stats.deleted },
    ],
    [stats],
  );

  if (loading) return <DashboardSkeleton />;
  if (error) return <DashboardErrorState onRetry={loadStats} />;

  if (stats.total === 0) {
    return (
      <EmptyState
        icon={BarChart3}
        title="No analytics yet"
        subtitle="Create tasks to see dashboard insights"
        ctaLabel="Create Task"
        ctaTo="/create-todo"
      />
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Analytics overview of your task activity and performance
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <KpiCard label="Total Tasks" value={stats.total} />
        <KpiCard label="Active" value={stats.current} />
        <KpiCard label="Completed" value={stats.completed} />
        <KpiCard label="Missed" value={stats.incomplete} />
        <KpiCard label="Deleted" value={stats.deleted} />
        <KpiCard label="Completion %" value={stats.completionRate} />
      </section>

      <ChartCard
        icon={PieChart}
        title="Status Distribution"
        subtitle="Task lifecycle breakdown"
      >
        <StatusDonut data={donutData} />
      </ChartCard>

      <ChartCard
        icon={BarChart2}
        title="Priority Spread"
        subtitle="Workload by priority"
      >
        <PriorityBar data={priorityData} />
      </ChartCard>

      <ChartCard
        icon={TrendingUp}
        title="Completion Performance"
        subtitle="Success vs missed ratio"
      >
        <CompletionKpi
          rate={stats.completionRate}
          completed={stats.completed}
          missed={stats.incomplete}
        />
      </ChartCard>

      <ChartCard
        icon={AlertCircle}
        title="Missed Reasons"
        subtitle="Top failure causes"
      >
        <FailureReasonBar data={failureReasonData} />
      </ChartCard>

      <ChartCard
        icon={Trash2}
        title="Delete Reasons"
        subtitle="Why tasks were removed"
      >
        <DeleteReasonBar data={deleteReasonData} />
      </ChartCard>

      <ChartCard
        icon={Activity}
        title="Trend"
        subtitle="Task activity over time"
      >
        <RangeSelector value={rangeDays} onChange={setRangeDays} />
        <TrendLine data={trendData} />
      </ChartCard>
    </div>
  );
};

export default Dashboard;
