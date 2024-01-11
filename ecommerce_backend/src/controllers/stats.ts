import { myCache } from "../app.js";
import { tryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { calculatePercentage } from "../utils/features.js";

export const getDashboardStats = tryCatch(async (req, res, next) => {
  let stats;
  if (myCache.has("admin-stats"))
    stats = JSON.parse(myCache.get("admin-stats") as string);
  else {
    const today = new Date();

    const sixMonthsAgo = new Date();

    sixMonthsAgo.setMonth(today.getMonth() - 6);

    const thisMonth = {
      start: new Date(today.getFullYear(), today.getMonth(), 1),
      end: today,
    };
    const lastMonth = {
      start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      end: new Date(today.getFullYear(), today.getMonth(), 0),
    };

    const thisMonthProductsPromise = Product.find({
      createdAt: { $gte: thisMonth.start, $lte: thisMonth.end },
    });
    const lastMonthProductsPromise = Product.find({
      createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
    });

    const thisMonthUsersPromise = User.find({
      createdAt: { $gte: thisMonth.start, $lte: thisMonth.end },
    });
    const lastMonthUsersPromise = User.find({
      createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
    });
    const thisMonthOrdersPromise = Order.find({
      createdAt: { $gte: thisMonth.start, $lte: thisMonth.end },
    });
    const lastMonthOrdersPromise = Order.find({
      createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
    });
    const lastSixMonthOrdersPromise = Order.find({
      createdAt: { $gte: sixMonthsAgo, $lte: today },
    });

    const [
      thisMonthProducts,
      lastMonthProducts,
      thisMonthUsers,
      lastMonthUsers,
      thisMonthOrders,
      lastMonthOrders,
      productCount,
      userCount,
      allOrders,
      lastSixMonthOrders,
    ] = await Promise.all([
      thisMonthProductsPromise,
      lastMonthProductsPromise,
      thisMonthUsersPromise,
      lastMonthUsersPromise,
      thisMonthOrdersPromise,
      lastMonthOrdersPromise,
      Product.countDocuments(),
      User.countDocuments(),
      Order.find({}).select("total"),
      lastSixMonthOrdersPromise,
    ]);

    const thisMonthRevenue = thisMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const lastMonthRevenue = lastMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const changePercent = {
      revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
      product: calculatePercentage(
        thisMonthProducts.length,
        lastMonthProducts.length
      ),
      user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
      order: calculatePercentage(
        thisMonthOrders.length,
        lastMonthOrders.length
      ),
    };

    const revenue = allOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const count = {
      revenue,
      product: productCount,
      user: userCount,
      order: allOrders.length,
    };

    const orderMonthCount = new Array(6).fill(0);
    const orderMonthlyRevenue = new Array(6).fill(0);

    lastSixMonthOrders.forEach((order) => {
      const creationDate = order.createdAt;
      const monthDiff = today.getMonth() - creationDate.getMonth();
      if (monthDiff < 6) {
            orderMonthCount[6-monthDiff-1] += 1;
            orderMonthlyRevenue[6-monthDiff-1] += order.total || 0;
      }
    });
    stats = {
      changePercent,
      count,
      chart:{
        order:orderMonthCount,
        revenue:orderMonthlyRevenue
      }
    };
  }
  return res.status(200).json({
    success: true,
    stats,
  });
});
export const getPieChart = tryCatch(async (req, res, next) => {});
export const getBarChart = tryCatch(async (req, res, next) => {});
export const getLineChart = tryCatch(async (req, res, next) => {});
