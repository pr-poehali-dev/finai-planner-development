import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AIRecommendation {
  title: string;
  description: string;
  type: string;
  icon: string;
}

interface AIRecommendationsTabProps {
  recommendations: AIRecommendation[];
}

const AIRecommendationsTab = ({ recommendations }: AIRecommendationsTabProps) => {
  return (
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
          {recommendations.map((rec, index) => (
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
  );
};

export default AIRecommendationsTab;
