import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface DashboardTabProps {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsGoal: number;
  currentSavings: number;
  currencySymbol: string;
  monthlyData: Array<{ month: string; income: number; expenses: number }>;
}

const DashboardTab = ({
  totalBalance,
  monthlyIncome,
  monthlyExpenses,
  savingsGoal,
  currentSavings,
  currencySymbol,
  monthlyData
}: DashboardTabProps) => {
  const maxValue = Math.max(...monthlyData.flatMap(d => [d.income, d.expenses]));

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <Card className="lg:col-span-2 border-2 hover:border-primary/50 transition-all duration-300 animate-scale-in rounded-3xl overflow-hidden bg-gradient-to-br from-card via-card to-primary/5">
          <CardHeader className="pb-3 sm:pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardDescription className="text-xs sm:text-sm">Общий баланс</CardDescription>
                <CardTitle className="text-3xl sm:text-5xl font-bold mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {totalBalance.toLocaleString()} {currencySymbol}
                </CardTitle>
              </div>
              <div className="bg-gradient-to-br from-primary to-secondary p-3 sm:p-4 rounded-3xl">
                <Icon name="Wallet" size={24} className="text-primary-foreground sm:w-8 sm:h-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:gap-6 mt-2 sm:mt-4">
              <div className="bg-success/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-success/20">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-success/20 p-1.5 sm:p-2 rounded-xl">
                    <Icon name="ArrowDownToLine" size={16} className="text-success sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Доходы</p>
                    <p className="text-lg sm:text-2xl font-bold text-success">+{(monthlyIncome / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>

              <div className="bg-destructive/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-destructive/20">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-destructive/20 p-1.5 sm:p-2 rounded-xl">
                    <Icon name="ArrowUpFromLine" size={16} className="text-destructive sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Расходы</p>
                    <p className="text-lg sm:text-2xl font-bold text-destructive">-{(monthlyExpenses / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-accent/50 transition-all duration-300 animate-scale-in rounded-3xl overflow-hidden bg-gradient-to-br from-card via-card to-accent/5" style={{ animationDelay: '100ms' }}>
          <CardHeader className="pb-3 sm:pb-6">
            <CardDescription className="text-xs sm:text-sm">Цель сбережений</CardDescription>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              {savingsGoal.toLocaleString()} {currencySymbol}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs sm:text-sm text-muted-foreground">Прогресс</span>
                  <span className="text-xs sm:text-sm font-semibold">{Math.round((currentSavings / savingsGoal) * 100)}%</span>
                </div>
                <Progress value={(currentSavings / savingsGoal) * 100} className="h-2 sm:h-3 rounded-full" />
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <Icon name="Target" size={14} className="sm:w-4 sm:h-4" />
                <span>Осталось: {(savingsGoal - currentSavings).toLocaleString()} {currencySymbol}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 rounded-3xl overflow-hidden animate-slide-up mb-4 sm:mb-6">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-2xl">
            <Icon name="TrendingUp" size={20} className="text-primary sm:w-6 sm:h-6" />
            Динамика доходов и расходов
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">6 месяцев</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-success to-emerald-400"></div>
                <span>Доходы</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-destructive to-orange-400"></div>
                <span>Расходы</span>
              </div>
            </div>

            <div className="relative h-48 sm:h-64">
              <div className="absolute inset-0 flex items-end justify-between gap-2 sm:gap-4">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="w-full flex gap-1 items-end">
                      <div
                        className="flex-1 bg-gradient-to-t from-success to-emerald-400 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group"
                        style={{ height: `${(data.income / maxValue) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-success text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {(data.income / 1000).toFixed(0)}K
                        </div>
                      </div>
                      <div
                        className="flex-1 bg-gradient-to-t from-destructive to-orange-400 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group"
                        style={{ height: `${(data.expenses / maxValue) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-destructive text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {(data.expenses / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardTab;
