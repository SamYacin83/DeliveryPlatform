import { useQuery } from "@tanstack/react-query";
import ArticleCard from "../components/ArticleCard";
import { Article } from "../types";

export default function HomePage() {
  const { data: articles } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
  });

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Article Delivery Service</h1>
        <p className="text-lg text-muted-foreground">
          Get your favorite articles delivered to your doorstep
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>
    </div>
  );
}
