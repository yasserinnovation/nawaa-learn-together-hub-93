
import { Trainer } from "@/types/trainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, ArrowUpRight, Download, CreditCard } from "lucide-react";

interface TrainerIncomeProps {
  trainer: Trainer;
}

const TrainerIncome = ({ trainer }: TrainerIncomeProps) => {
  const income = trainer.income;
  
  if (!income) {
    return (
      <Card className="py-12">
        <CardContent className="text-center">
          <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-medium text-lg">No income data available</h3>
          <p className="text-gray-500 mt-2">
            Start accepting bookings to see your earnings here.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Income Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Earnings</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <span>SAR {income.totalEarned.toLocaleString()}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+15% from last year</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Payments</CardDescription>
            <CardTitle className="text-2xl">SAR {income.pendingPayments.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500">
              Expected within 7 days
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Last Month Earnings</CardDescription>
            <CardTitle className="text-2xl">SAR {income.lastMonthEarnings.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-600 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+5% from previous month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Earnings</CardTitle>
          <CardDescription>Your earnings over the past months</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={income.bookingsByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`SAR ${value}`, 'Earnings']} />
              <Bar dataKey="amount" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 border rounded-md mb-3">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Bank Account</h3>
                  <p className="text-sm text-gray-500">**** 4832</p>
                </div>
              </div>
              <span className="text-sm text-green-600">Primary</span>
            </div>
            
            <button className="text-blue-600 text-sm font-medium">
              + Add Payment Method
            </button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tax Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <Download className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">2023 Income Summary</h3>
                  <p className="text-sm text-gray-500">Generated on Jan 31, 2024</p>
                </div>
              </div>
              <button className="text-blue-600 text-sm font-medium">Download</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainerIncome;
