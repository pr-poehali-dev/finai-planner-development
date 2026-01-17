import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState<'RUB' | 'USD' | 'EUR'>('RUB');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense'
  });

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

  const monthlyData = [
    { month: 'Авг', income: 145000, expenses: 95000 },
    { month: 'Сен', income: 152000, expenses: 102000 },
    { month: 'Окт', income: 148000, expenses: 98000 },
    { month: 'Ноя', income: 155000, expenses: 103000 },
    { month: 'Дек', income: 160000, expenses: 105000 },
    { month: 'Янв', income: 150000, expenses: 98450 },
  ];

  const maxValue = Math.max(...monthlyData.flatMap(d => [d.income, d.expenses]));

  const categories = [
    { name: 'Продукты', amount: 28500, percent: 29, color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: 'ShoppingCart' },
    { name: 'Жильё', amount: 35000, percent: 36, color: 'bg-gradient-to-r from-blue-500 to-cyan-500', icon: 'Home' },
    { name: 'Транспорт', amount: 12000, percent: 12, color: 'bg-gradient-to-r from-orange-500 to-red-500', icon: 'Car' },
    { name: 'Развлечения', amount: 15450, percent: 16, color: 'bg-gradient-to-r from-green-500 to-emerald-500', icon: 'Sparkles' },
    { name: 'Сбережения', amount: 7500, percent: 8, color: 'bg-gradient-to-r from-indigo-500 to-purple-500', icon: 'PiggyBank' },
  ];

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, title: 'Покупка продуктов', amount: -4500, category: 'Продукты', date: '18 янв', icon: 'ShoppingCart' },
    { id: 2, title: 'Зарплата', amount: 150000, category: 'Доход', date: '15 янв', icon: 'TrendingUp' },
    { id: 3, title: 'Оплата аренды', amount: -35000, category: 'Жильё', date: '12 янв', icon: 'Home' },
    { id: 4, title: 'Заправка авто', amount: -3200, category: 'Транспорт', date: '10 янв', icon: 'Car' },
    { id: 5, title: 'Фриланс проект', amount: 25000, category: 'Доход', date: '8 янв', icon: 'Briefcase' },
  ]);

  const handleAddTransaction = () => {
    if (!newTransaction.title || !newTransaction.amount || !newTransaction.category) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    const amount = parseFloat(newTransaction.amount);
    const finalAmount = newTransaction.type === 'expense' ? -Math.abs(amount) : Math.abs(amount);
    
    const categoryIcons: Record<string, string> = {
      'Продукты': 'ShoppingCart',
      'Жильё': 'Home',
      'Транспорт': 'Car',
      'Развлечения': 'Sparkles',
      'Сбережения': 'PiggyBank',
      'Доход': 'TrendingUp',
      'Зарплата': 'Briefcase',
      'Другое': 'DollarSign'
    };

    const transaction = {
      id: Date.now(),
      title: newTransaction.title,
      amount: finalAmount,
      category: newTransaction.category,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      icon: categoryIcons[newTransaction.category] || 'DollarSign'
    };

    setRecentTransactions([transaction, ...recentTransactions]);
    setIsAddTransactionOpen(false);
    setNewTransaction({ title: '', amount: '', category: '', type: 'expense' });
    
    toast({
      title: 'Успешно!',
      description: 'Транзакция добавлена',
    });
  };

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

  const navItems = [
    { id: 'dashboard', label: 'Главная', icon: 'LayoutDashboard' },
    { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
    { id: 'transactions', label: 'Транзакции', icon: 'Receipt' },
    { id: 'ai', label: 'AI Советы', icon: 'Sparkles' },
  ];

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 transition-colors duration-500 pb-20 md:pb-6">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
          <header className="flex items-center justify-between mb-6 sm:mb-8 animate-fade-in">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                FinAI Planner
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">Ваш личный финансовый помощник</p>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-2xl px-4 py-2 border border-border/50">
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

              <div className="flex items-center gap-2 sm:gap-3 bg-card/50 backdrop-blur-sm rounded-2xl px-3 sm:px-4 py-2 border border-border/50">
                <Icon name="Sun" size={16} className="text-muted-foreground sm:w-[18px] sm:h-[18px]" />
                <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                <Icon name="Moon" size={16} className="text-muted-foreground sm:w-[18px] sm:h-[18px]" />
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-2xl">
                    <Icon name="Settings" size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent className="rounded-l-3xl">
                  <SheetHeader>
                    <SheetTitle>Настройки</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Валюта</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {(['RUB', 'USD', 'EUR'] as const).map((curr) => (
                          <Button
                            key={curr}
                            variant={currency === curr ? 'default' : 'outline'}
                            onClick={() => setCurrency(curr)}
                            className="rounded-xl"
                          >
                            {curr}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Уведомления</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Превышение бюджета</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Рекомендации AI</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <Card className="lg:col-span-2 border-2 hover:border-primary/50 transition-all duration-300 animate-scale-in rounded-3xl overflow-hidden bg-gradient-to-br from-card via-card to-primary/5">
                  <CardHeader className="pb-3 sm:pb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardDescription className="text-xs sm:text-sm">Общий баланс</CardDescription>
                        <CardTitle className="text-3xl sm:text-5xl font-bold mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {totalBalance.toLocaleString()} {currencySymbols[currency]}
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
                      {savingsGoal.toLocaleString()} {currencySymbols[currency]}
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
                        <span>Осталось: {(savingsGoal - currentSavings).toLocaleString()} {currencySymbols[currency]}</span>
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
          )}

          {activeTab === 'analytics' && (
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
                          <p className="font-semibold text-sm sm:text-base">{category.amount.toLocaleString()} {currencySymbols[currency]}</p>
                          <p className="text-xs text-muted-foreground">{category.percent}%</p>
                        </div>
                      </div>
                      <Progress value={category.percent} className="h-2 rounded-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'transactions' && (
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
                      {recentTransactions.map((transaction, index) => (
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
                            {transaction.amount.toLocaleString()} {currencySymbols[currency]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="income">
                    <div className="space-y-3">
                      {recentTransactions.filter(t => t.amount > 0).map((transaction, index) => (
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
                            +{transaction.amount.toLocaleString()} {currencySymbols[currency]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="expenses">
                    <div className="space-y-3">
                      {recentTransactions.filter(t => t.amount < 0).map((transaction, index) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-all duration-300 cursor-pointer animate-fade-in"
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
                            {transaction.amount.toLocaleString()} {currencySymbols[currency]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {activeTab === 'ai' && (
            <Card className="border-2 rounded-3xl overflow-hidden animate-slide-up">
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
                          className={`p-2 rounded-xl flex-shrink-0 ${
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
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold mb-1 text-sm sm:text-base">{rec.title}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
          <DialogTrigger asChild>
            <Button 
              size="icon"
              className="fixed bottom-20 right-4 w-16 h-16 rounded-full shadow-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 hover:scale-110 md:hidden z-40 animate-scale-in"
            >
              <Icon name="Plus" size={28} className="text-primary-foreground" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-3xl mx-4">
            <DialogHeader>
              <DialogTitle>Новая транзакция</DialogTitle>
              <DialogDescription>
                Добавьте доход или расход в ваш бюджет
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type-mobile">Тип транзакции</Label>
                <Select
                  value={newTransaction.type}
                  onValueChange={(value: 'income' | 'expense') => 
                    setNewTransaction({ ...newTransaction, type: value })
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Расход</SelectItem>
                    <SelectItem value="income">Доход</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title-mobile">Название</Label>
                <Input
                  id="title-mobile"
                  placeholder="Например: Покупка продуктов"
                  className="rounded-xl"
                  value={newTransaction.title}
                  onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount-mobile">Сумма ({currencySymbols[currency]})</Label>
                <Input
                  id="amount-mobile"
                  type="number"
                  placeholder="0"
                  className="rounded-xl"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-mobile">Категория</Label>
                <Select
                  value={newTransaction.category}
                  onValueChange={(value) => 
                    setNewTransaction({ ...newTransaction, category: value })
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {newTransaction.type === 'expense' ? (
                      <>
                        <SelectItem value="Продукты">🛒 Продукты</SelectItem>
                        <SelectItem value="Жильё">🏠 Жильё</SelectItem>
                        <SelectItem value="Транспорт">🚗 Транспорт</SelectItem>
                        <SelectItem value="Развлечения">✨ Развлечения</SelectItem>
                        <SelectItem value="Сбережения">🐷 Сбережения</SelectItem>
                        <SelectItem value="Другое">💰 Другое</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Зарплата">💼 Зарплата</SelectItem>
                        <SelectItem value="Доход">📈 Доход</SelectItem>
                        <SelectItem value="Другое">💰 Другое</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsAddTransactionOpen(false)}
                className="flex-1 rounded-xl"
              >
                Отмена
              </Button>
              <Button
                onClick={handleAddTransaction}
                className="flex-1 rounded-xl bg-gradient-to-r from-primary to-secondary"
              >
                Добавить
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border md:hidden z-50">
          <div className="grid grid-cols-4 gap-1 px-2 py-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="hidden md:block">
          <div className="container mx-auto px-4 max-w-7xl mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <Card className="border-2 rounded-3xl overflow-hidden animate-slide-up mt-6" style={{ animationDelay: '200ms' }}>
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
                    <div className="space-y-3">
                      {recentTransactions.filter(t => t.amount > 0).map((transaction, index) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-all duration-300 cursor-pointer"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-success/20">
                              <Icon name={transaction.icon as any} size={20} className="text-success" />
                            </div>
                            <div>
                              <p className="font-medium">{transaction.title}</p>
                              <span className="text-xs text-muted-foreground">{transaction.date}</span>
                            </div>
                          </div>
                          <p className="text-xl font-bold text-success">
                            +{transaction.amount.toLocaleString()} {currencySymbols[currency]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="expenses">
                    <div className="space-y-3">
                      {recentTransactions.filter(t => t.amount < 0).map((transaction, index) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-all duration-300 cursor-pointer"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-muted">
                              <Icon name={transaction.icon as any} size={20} className="text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{transaction.title}</p>
                              <span className="text-xs text-muted-foreground">{transaction.date}</span>
                            </div>
                          </div>
                          <p className="text-xl font-bold">
                            {transaction.amount.toLocaleString()} {currencySymbols[currency]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
                <DialogTrigger asChild>
                  <Button className="h-14 text-base font-semibold rounded-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить транзакцию
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-3xl">
                  <DialogHeader>
                    <DialogTitle>Новая транзакция</DialogTitle>
                    <DialogDescription>
                      Добавьте доход или расход в ваш бюджет
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Тип транзакции</Label>
                      <Select
                        value={newTransaction.type}
                        onValueChange={(value: 'income' | 'expense') => 
                          setNewTransaction({ ...newTransaction, type: value })
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="expense">Расход</SelectItem>
                          <SelectItem value="income">Доход</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Название</Label>
                      <Input
                        id="title"
                        placeholder="Например: Покупка продуктов"
                        className="rounded-xl"
                        value={newTransaction.title}
                        onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Сумма ({currencySymbols[currency]})</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0"
                        className="rounded-xl"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Категория</Label>
                      <Select
                        value={newTransaction.category}
                        onValueChange={(value) => 
                          setNewTransaction({ ...newTransaction, category: value })
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {newTransaction.type === 'expense' ? (
                            <>
                              <SelectItem value="Продукты">🛒 Продукты</SelectItem>
                              <SelectItem value="Жильё">🏠 Жильё</SelectItem>
                              <SelectItem value="Транспорт">🚗 Транспорт</SelectItem>
                              <SelectItem value="Развлечения">✨ Развлечения</SelectItem>
                              <SelectItem value="Сбережения">🐷 Сбережения</SelectItem>
                              <SelectItem value="Другое">💰 Другое</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="Зарплата">💼 Зарплата</SelectItem>
                              <SelectItem value="Доход">📈 Доход</SelectItem>
                              <SelectItem value="Другое">💰 Другое</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddTransactionOpen(false)}
                      className="flex-1 rounded-xl"
                    >
                      Отмена
                    </Button>
                    <Button
                      onClick={handleAddTransaction}
                      className="flex-1 rounded-xl bg-gradient-to-r from-primary to-secondary"
                    >
                      Добавить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
    </div>
  );
};

export default Index;