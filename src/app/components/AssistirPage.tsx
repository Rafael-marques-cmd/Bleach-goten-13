import { ExternalLink, Book, Tv } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import backgroundImg from "@/assets/fundo.jpg";

export function AssistirPage() {
  const platforms = [
    {
      type: "anime",
      name: "Crunchyroll",
      description: "Assista todos os episódios de Bleach legendado",
      url: "https://www.crunchyroll.com/",
      icon: Tv,
    },
    {
      type: "anime",
      name: "Disney+",
      description: "Temporadas disponíveis em português",
      url: "https://www.disneyplus.com/browse/entity-c649c634-7f8d-48a9-ba72-48bd4b9c8419?distributionPartner=google",
      icon: Tv,
    },
    {
      type: "manga",
      name: "MangáPlus",
      description: "Leia o mangá oficial gratuitamente",
      url: "https://mangaplus.shueisha.co.jp/",
      icon: Book,
    },
    {
      type: "manga",
      name: "Viz Media",
      description: "Mangá completo em inglês",
      url: "https://www.viz.com/",
      icon: Book,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Onde Assistir ou Ler
            </h2>
            <p className="text-lg text-white/80">
              Confira as plataformas oficiais para acompanhar a saga de Bleach
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <Card
                  key={index}
                  className="bg-slate-900/80 border-orange-500/30 backdrop-blur-sm hover:border-orange-500 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-orange-500/20 rounded-lg">
                        <Icon className="size-6 text-orange-500" />
                      </div>
                      <CardTitle className="text-white text-xl">
                        {platform.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-slate-300">
                      {platform.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Acessar
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 p-6 bg-slate-900/60 backdrop-blur-sm rounded-lg border border-orange-500/20">
            <h3 className="text-xl font-bold text-white mb-3">Sobre Bleach</h3>
            <div className="space-y-2 text-slate-300">
              <p>
                <strong className="text-white">Mangá:</strong> 74 volumes
                (2001-2016) por Tite Kubo
              </p>
              <p>
                <strong className="text-white">Anime:</strong> 366 episódios +
                Arco da Guerra Sangrenta de Mil Anos (em andamento)
              </p>
              <p>
                <strong className="text-white">Gênero:</strong> Ação, Aventura,
                Sobrenatural, Shounen
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
