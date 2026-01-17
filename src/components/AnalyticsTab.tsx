import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Category {
  name: string;
  amount: number;
  percent: number;
  color: string;
  icon: string;
}

interface AnalyticsTabProps {
  categories: Category[];
  currencySymbol: string;
}

const AnalyticsTab = ({ categories, currencySymbol }: AnalyticsTabProps) => {
  return (
    <Card className="border-2 rounded-3xl overflow-hidden animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="PieChart" size={24} className="text-primary" />
          Анализ расходов
        </CardTitle>
        <CardDescription>Распределение по категориям за месяц</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={category.name} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`${category.color} p-2 rounded-xl`}>
                    <Icon name={category.icon as any} size={18} className="text-white" />
                  </div>
                  <span className="font-medium text-sm sm:text-base">{category.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm sm:text-base">{category.amount.toLocaleString()} {currencySymbol}</p>
                  <p className="text-xs text-muted-foreground">{category.percent}%</p>
                </div>
              </div>
              <Progress value={category.percent} className="h-2 rounded-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab;
