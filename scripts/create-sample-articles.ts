import { db } from "../db";
import { articles } from "../db/schema";

async function createSampleArticles() {
  try {
    const sampleArticles = [
      {
        title: "Le Monde Quotidien",
        description: "Journal quotidien d'actualités internationales",
        price: 3.50,
        supplierId: 7, // supplier1's ID
        stock: 100,
      },
      {
        title: "Science Magazine",
        description: "Magazine mensuel de découvertes scientifiques",
        price: 5.99,
        supplierId: 7,
        stock: 50,
      },
      {
        title: "Tech Review",
        description: "Revue hebdomadaire des nouvelles technologies",
        price: 4.99,
        supplierId: 7,
        stock: 75,
      },
      {
        title: "Sports Hebdo",
        description: "Magazine hebdomadaire de sport",
        price: 3.99,
        supplierId: 7,
        stock: 60,
      }
    ];

    for (const article of sampleArticles) {
      await db.insert(articles).values(article);
      console.log(`Created article: ${article.title}`);
    }
    
    console.log('All sample articles created successfully');
  } catch (error) {
    console.error('Error creating sample articles:', error);
    throw error;
  }
}

createSampleArticles().catch(console.error);
