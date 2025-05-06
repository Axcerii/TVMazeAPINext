type SearchResult = {
    show: {
      id: number;
      name: string;
      image: { medium: string } | null;
      summary: string;
    };
  };
  
  export default async function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
    const query = searchParams.query?.trim() ?? '';
  
    if (!query) {
      return <p className="p-8 text-gray-500">Aucune recherche en cours.</p>;
    }
  
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    const results: SearchResult[] = await res.json();

    results.forEach((result)=>{
      if(result.show.summary?.length > 200){
         result.show.summary = result.show.summary.substring(0, 150) + '...';
      }
      else if(!result.show.summary){
        result.show.summary = 'Pas de description disponible.';
      }
    })

    return (
      <main className="p-4 text-white">
        <h1 className="text-2xl font-bold mb-6">
          Résultats pour &quot;{query}&quot;
        </h1>
  
        {results.length === 0 ? (
          <p className="text-white">Aucun résultat trouvé.</p>
        ) : (
          <div className="flex flex-col gap-6 w-full mx-auto md:w-2/3">
            {results.map(({ show }) => (
              <a href={`/shows/${show.id}`} key={show.id} className="flex rounded-xl shadow p-3 hover:bg-[#000000] hover:scale-105 transition w-full gap-6  border border-solid border-white">
                {show.image ? (
                  <img
                    src={show.image.medium}
                    alt={show.name}
                    className="w-auto h-40 rounded-md shrink-0 object-cover"
                  />
                ) : (
                  <img src="https://placehold.co/345x480/DD3030/FFF?text=🚫" alt="Pas d'image disponible"
                  className="w-auto h-40 rounded-md shrink-0 object-cover" />
                )}
                <div>
                  <h2 className="text-lg font-semibold">
                    {show.name}
                  </h2>
                  <p className="text-md"
                  dangerouslySetInnerHTML={{ __html: show.summary }}></p>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    );
  }
  