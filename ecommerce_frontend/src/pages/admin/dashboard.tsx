import { BiMaleFemale } from "react-icons/bi";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { Skeleton } from "../../components/Loader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import DashboardTable from "../../components/admin/DashboardTable";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC";
import { useStatsQuery } from "../../redux/api/dashboardAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { getLastMonths } from "../../utils/features";

interface DataType {
  categories: string;
  value: string;
}

const columns: Column<DataType>[] = [
  {
    Header: "Categories",
    accessor: "categories",
  },
  {
    Header: "Value",
    accessor: "value",
  },
];

const Dashboard = () => {
  const { lastSixMonths: months } = getLastMonths();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError, error } = useStatsQuery(user?._id!);
  const stats = data?.stats!;

  const [rows, setRows] = useState<DataType[]>([]);
  if (isError) toast.error((error as CustomError).data.message);
  useEffect(() => {
    if (data)
      setRows(
        data.stats.categoryCount.map((i) => ({
          categories: Object.keys(i)[0],
          value: `${Object.values(i)[0]}%`,
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Inventory",
    rows.length > 6
  )();

  if (isError) return <Navigate to={"/"} />;
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section className="widget-container">
              <WidgetItem
                percent={stats.changePercent.revenue}
                amount={true}
                value={stats.count.revenue}
                heading="Revenue"
                color="rgb(0, 115, 255)"
              />
              <WidgetItem
                percent={stats.changePercent.user}
                value={stats.count.user}
                color="rgb(0 198 202)"
                heading="Users"
              />
              <WidgetItem
                percent={stats.changePercent.order}
                value={stats.count.order}
                color="rgb(255 196 0)"
                heading="Transactions"
              />

              <WidgetItem
                percent={stats.changePercent.product}
                value={stats.count.product}
                color="rgb(76 0 255)"
                heading="Products"
              />
            </section>

            <section className="graph-container">
              <div className="revenue-chart">
                <h2>Revenue & Transaction </h2>

                <BarChart
                  labels={months}
                  data_1={stats.chart.revenue}
                  data_2={stats.chart.order}
                  title_1="Revenue"
                  title_2="Transaction"
                  bgColor_1="rgb(219, 68, 68)"
                  bgColor_2="rgba(53, 162, 235, 0.8)"
                />
              </div>

              <div className="dashboard-categories">
                <div>
                  <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
                </div>
              </div>
            </section>

            <section className="transaction-container">
              <div className="gender-chart">
                <h2>Gender Ratio</h2>
                <DoughnutChart
                  labels={["Female", "Male"]}
                  data={[stats.userRatio.female, stats.userRatio.male]}
                  backgroundColor={[
                    "hsl(340, 82%, 56%)",
                    "rgba(53, 162, 235, 0.8)",
                  ]}
                  cutout={90}
                />
                <p>
                  <BiMaleFemale />
                </p>
              </div>
              <DashboardTable data={stats.latestTransaction} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{amount ? `₹${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{`${percent > 10000 ? 9999 : percent}%`}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {`${percent < -10000 ? -9999 : percent}%`}
        </span>
      )}
    </div>

    <div
      className="widget-circle"
      style={{
        background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span
        style={{
          color,
        }}
      >
        {percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
        {percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
      </span>
    </div>
  </article>
);

export default Dashboard;
