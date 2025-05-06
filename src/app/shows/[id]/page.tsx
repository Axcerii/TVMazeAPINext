import ActorList from "@/components/ActorList";

type Show = {
    id: number;
    name: string;
    image: { original: string } | null;
    summary: string;
  };
  
  type CastMember = {
    person: {
      id: number;
      name: string;
      image: { medium: string } | null;
    };
    character: {
      name: string;
    };
  };
  
  type Episode = {
    id: number;
    name: string;
    season: number;
    number: number;
  };
  
  export default async function ShowDetailPage({ params }: { params: { id: string } }) {
    const [showRes, castRes, episodesRes] = await Promise.all([
      fetch(`https://api.tvmaze.com/shows/${params.id}`),
      fetch(`https://api.tvmaze.com/shows/${params.id}/cast`),
      fetch(`https://api.tvmaze.com/shows/${params.id}/episodes`)
    ]);
  
    const show: Show = await showRes.json();
    const cast: CastMember[] = await castRes.json();
    const episodes: Episode[] = await episodesRes.json();
  
    const mapCastMember = await cast.map((actor: any) => ({
      id: actor.person.id,
      name: actor.person.name,
      image: actor.person.image?.medium || null,
      character: actor.character?.name || null
    }))

    const episodesBySeason = episodes.reduce<Record<number, Episode[]>>((acc, ep) => {
      acc[ep.season] = acc[ep.season] || [];
      acc[ep.season].push(ep);
      return acc;
    }, {});
  
    return (
      <main className="p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">{show.name}</h1>
  
        {show.image && (
          <img src={show.image.original} alt={show.name} className="mb-4 rounded-lg w-9/10 md:w-1/2 mx-auto" />
        )}
  
        <div className="mx-auto lg:w-2/3 mb-8">
          <h2 className="text-2xl font-semibold mb-2">Synopsis</h2>

          <div
            dangerouslySetInnerHTML={{ __html: show.summary }}
            />
        </div>
  
       <ActorList title="Acteurs" list={mapCastMember} />
  
        <h2 className="text-2xl font-semibold mb-2">Épisodes</h2>
        {Object.entries(episodesBySeason).map(([season, eps]) => (
          <div key={season} className="mb-4">
            <details>
              <summary className="text-xl font-semibold">
                Saison {season}
              </summary>
              <ul className="list-disc list-inside pl-4">
                {eps.map(ep => (
                  <li key={ep.id}>
                    Episode {ep.number}: {ep.name}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))}
      </main>
    );
  }