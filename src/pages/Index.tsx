import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState<'RUB' | 'USD' | 'EUR'>('RUB');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const currencySymbols = {
    RUB: '₽',
    USD: '$',
    EUR: '€'
  };

  const totalBalance = 245680;
  const monthlyIncome = 150000;
  const monthlyExpenses = 98450;
  const savingsGoal = 500000;
  const currentSavings = 245680;

  const categories = [
    { name: 'Продукты', amount: 28500, percent: 29, color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: 'ShoppingCart' },
    { name: 'Жильё', amount: 35000, percent: 36, color: 'bg-gradient-to-r from-blue-500 to-cyan-500', icon: 'Home' },
    { name: 'Транспорт', amount: 12000, percent: 12, color: 'bg-gradient-to-r from-orange-500 to-red-500', icon: 'Car' },
    { name: 'Развлечения', amount: 15450, percent: 16, color: 'bg-gradient-to-r from-green-500 to-emerald-500', icon: 'Sparkles' },
    { name: 'Сбережения', amount: 7500, percent: 8, color: 'bg-gradient-to-r from-indigo-500 to-purple-500', icon: 'PiggyBank' },
  ];

  const recentTransactions = [
    { id: 1, title: 'Покупка продуктов', amount: -4500, category: 'Продукты', date: '18 янв', icon: 'ShoppingCart' },
    { id: 2, title: 'Зарплата', amount: 150000, category: 'Доход', date: '15 янв', icon: 'TrendingUp' },
    { id: 3, title: 'Оплата аренды', amount: -35000, category: 'Жильё', date: '12 янв', icon: 'Home' },
    { id: 4, title: 'Заправка авто', amount: -3200, category: 'Транспорт', date: '10 янв', icon: 'Car' },
  ];

  const aiRecommendations = [
    {
      title: 'Оптимизация расходов',
      description: 'Вы тратите на 15% больше на развлечения, чем в прошлом месяце. Рекомендую сократить траты до 12 000 ₽.',
      type: 'warning',
      icon: 'AlertCircle'
    },
    {
      title: 'Достижение цели',
      description: 'При текущем темпе сбережений вы достигнете цели в 500 000 ₽ через 5 месяцев. Увеличьте откладываемую сумму до 15 000 ₽ для достижения за 3 месяца.',
      type: 'success',
      icon: 'Target'
    },
    {
      title: 'Инвестиционная возможность',
      description: 'У вас накопилось достаточно средств для диверсификации. Рассмотрите инвестирование 20% сбережений в консервативные фонды.',
      type: 'info',
      icon: 'TrendingUp'
    }
  ];

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 transition-colors duration-500">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <header className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                FinAI Planner
              </h1>
              <p className="text-muted-foreground mt-1">Ваш личный финансовый помощник</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-2xl px-4 py-2 border border-border/50">
                {(['RUB', 'USD', 'EUR'] as const).map((curr) => (
                  <Button
                    key={curr}
                    variant={currency === curr ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrency(curr)}
                    className="rounded-xl transition-all duration-300"
                  >
                    {curr}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-2xl px-4 py-2 border border-border/50">
                <Icon name="Sun" size={18} className="text-muted-foreground" />
                <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                <Icon name="Moon" size={18} className="text-muted-foreground" />
              </div>

              <Button variant="outline" size="icon" className="rounded-2xl">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2 border-2 hover:border-primary/50 transition-all duration-300 animate-scale-in rounded-3xl overflow-hidden bg-gradient-to-br from-card via-card to-primary/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription>Общий баланс</CardDescription>
                    <CardTitle className="text-5xl font-bold mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {totalBalance.toLocaleString()} {currencySymbols[currency]}
                    </CardTitle>
                  </div>
                  <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-3xl">
                    <Icon name="Wallet" size={32} className="text-primary-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div className="bg-success/10 backdrop-blur-sm rounded-2xl p-4 border border-success/20">
                    <div className="flex items-center gap-3">
                      <div className="bg-success/20 p-2 rounded-xl">
                        <Icon name="ArrowDownToLine" size={20} className="text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Доходы</p>
                        <p className="text-2xl font-bold text-success">+{monthlyIncome.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-destructive/10 backdrop-blur-sm rounded-2xl p-4 border border-destructive/20">
                    <div className="flex items-center gap-3">
                      <div className="bg-destructive/20 p-2 rounded-xl">
                        <Icon name="ArrowUpFromLine" size={20} className="text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Расходы</p>
                        <p className="text-2xl font-bold text-destructive">-{monthlyExpenses.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-all duration-300 animate-scale-in rounded-3xl overflow-hidden bg-gradient-to-br from-card via-card to-accent/5" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardDescription>Цель сбережений</CardDescription>
                <CardTitle className="text-2xl font-bold">
                  {savingsGoal.toLocaleString()} {currencySymbols[currency]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Прогресс</span>
                      <span className="text-sm font-semibold">{Math.round((currentSavings / savingsGoal) * 100)}%</span>
                    </div>
                    <Progress value={(currentSavings / savingsGoal) * 100} className="h-3 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Target" size={16} />
                    <span>Осталось: {(savingsGoal - currentSavings).toLocaleString()} {currencySymbols[currency]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{category.amount.toLocaleString()} {currencySymbols[currency]}</p>
                          <p className="text-xs text-muted-foreground">{category.percent}%</p>
                        </div>
                      </div>
                      <Progress value={category.percent} className="h-2 rounded-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 rounded-3xl overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sparkles" size={24} className="text-secondary" />
                  AI-Рекомендации
                </CardTitle>
                <CardDescription>Персональные советы по управлению финансами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiRecommendations.map((rec, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in ${
                        rec.type === 'warning'
                          ? 'bg-accent/5 border-accent/30 hover:border-accent'
                          : rec.type === 'success'
                          ? 'bg-success/5 border-success/30 hover:border-success'
                          : 'bg-primary/5 border-primary/30 hover:border-primary'
                      }`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-xl ${
                            rec.type === 'warning'
                              ? 'bg-accent/20'
                              : rec.type === 'success'
                              ? 'bg-success/20'
                              : 'bg-primary/20'
                          }`}
                        >
                          <Icon
                            name={rec.icon as any}
                            size={20}
                            className={
                              rec.type === 'warning'
                                ? 'text-accent'
                                : rec.type === 'success'
                                ? 'text-success'
                                : 'text-primary'
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 rounded-3xl overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="History" size={24} className="text-primary" />
                Последние транзакции
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3 rounded-2xl">
                  <TabsTrigger value="all" className="rounded-xl">Все</TabsTrigger>
                  <TabsTrigger value="income" className="rounded-xl">Доходы</TabsTrigger>
                  <TabsTrigger value="expenses" className="rounded-xl">Расходы</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-6">
                  <div className="space-y-3">
                    {recentTransactions.map((transaction, index) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-all duration-300 cursor-pointer animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${transaction.amount > 0 ? 'bg-success/20' : 'bg-muted'}`}>
                            <Icon name={transaction.icon as any} size={20} className={transaction.amount > 0 ? 'text-success' : 'text-muted-foreground'} />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="rounded-full text-xs">
                                {transaction.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{transaction.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className={`text-xl font-bold ${transaction.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                          {transaction.amount > 0 ? '+' : ''}
                          {transaction.amount.toLocaleString()} {currencySymbols[currency]}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="income">
                  <p className="text-center text-muted-foreground py-8">Фильтр по доходам</p>
                </TabsContent>
                <TabsContent value="expenses">
                  <p className="text-center text-muted-foreground py-8">Фильтр по расходам</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button className="h-14 text-base font-semibold rounded-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить транзакцию
            </Button>
            <Button variant="outline" className="h-14 text-base font-semibold rounded-2xl border-2">
              <Icon name="Upload" size={20} className="mr-2" />
              Импорт выписки
            </Button>
            <Button variant="outline" className="h-14 text-base font-semibold rounded-2xl border-2">
              <Icon name="Crown" size={20} className="mr-2" />
              Премиум подписка
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
