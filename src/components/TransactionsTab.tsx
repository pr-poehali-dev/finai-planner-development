import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  icon: string;
}

interface TransactionsTabProps {
  transactions: Transaction[];
  currencySymbol: string;
}

const TransactionsTab = ({ transactions, currencySymbol }: TransactionsTabProps) => {
  return (
    <Card className="border-2 rounded-3xl overflow-hidden animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="History" size={24} className="text-primary" />
          Последние транзакции
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-2xl">
            <TabsTrigger value="all" className="rounded-xl text-xs sm:text-sm">Все</TabsTrigger>
            <TabsTrigger value="income" className="rounded-xl text-xs sm:text-sm">Доходы</TabsTrigger>
            <TabsTrigger value="expenses" className="rounded-xl text-xs sm:text-sm">Расходы</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="space-y-3">
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-all duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className={`p-2 sm:p-3 rounded-xl flex-shrink-0 ${transaction.amount > 0 ? 'bg-success/20' : 'bg-muted'}`}>
                      <Icon name={transaction.icon as any} size={18} className={transaction.amount > 0 ? 'text-success' : 'text-muted-foreground sm:w-5 sm:h-5'} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{transaction.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="rounded-full text-xs">
                          {transaction.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{transaction.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className={`text-base sm:text-xl font-bold flex-shrink-0 ml-2 ${transaction.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                    {transaction.amount > 0 ? '+' : ''}
                    {transaction.amount.toLocaleString()} {currencySymbol}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="income">
            <div className="space-y-3">
              {transactions.filter(t => t.amount > 0).map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-all duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-xl bg-success/20">
                      <Icon name={transaction.icon as any} size={18} className="text-success sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">{transaction.title}</p>
                      <span className="text-xs text-muted-foreground">{transaction.date}</span>
                    </div>
                  </div>
                  <p className="text-base sm:text-xl font-bold text-success">
                    +{transaction.amount.toLocaleString()} {currencySymbol}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="expenses">
            <div className="space-y-3">
              {transactions.filter(t => t.amount < 0).map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-xl bg-muted">
                      <Icon name={transaction.icon as any} size={18} className="text-muted-foreground sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">{transaction.title}</p>
                      <span className="text-xs text-muted-foreground">{transaction.date}</span>
                    </div>
                  </div>
                  <p className="text-base sm:text-xl font-bold">
                    {transaction.amount.toLocaleString()} {currencySymbol}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransactionsTab;
