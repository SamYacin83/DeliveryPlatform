export default function TestimonialsPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              Témoignages Clients
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez ce que nos clients disent de nous
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                M
              </div>
              <div>
                <h3 className="font-semibold">Marie Dubois</h3>
                <p className="text-sm text-muted-foreground">Cliente</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground">
              Service impeccable ! Ma commande est arrivée en moins de 20 minutes. Je recommande vivement.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                T
              </div>
              <div>
                <h3 className="font-semibold">Thomas Martin</h3>
                <p className="text-sm text-muted-foreground">Client Professionnel</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground">
              RapidLivre a révolutionné la gestion de mes livraisons urgentes. Un gain de temps précieux !
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                S
              </div>
              <div>
                <h3 className="font-semibold">Sophie Laurent</h3>
                <p className="text-sm text-muted-foreground">Cliente</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[1, 2, 3, 4].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground">
              Application très intuitive et livreurs toujours courtois. Parfait pour mes courses hebdomadaires.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
