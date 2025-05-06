import ShowCard from "@/components/ShowCard";

export default async function ActorDetails({ params }: { params: { id: string } }) {
  const res = await fetch(`https://api.tvmaze.com/people/${params.id}/castcredits?embed=show`);
  const actor = await fetch(`https://api.tvmaze.com/people/${params.id}`).then(res => res.json());
  const data = await res.json();

  return (
    <main className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-6">{actor.name}</h1>
        {actor.image && (
          <img src={actor.image.original} alt={actor.name} className="mb-4 rounded-lg w-9/10 md:w-1/2 mx-auto" />
        )}
        {actor.birthday && (
          <p className="text-center">
            Né en {actor.birthday}
          </p>
        )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((credit: any) => {
          const show = credit._embedded?.show;
          if (!show) return null;

          return (
            <ShowCard
              key={show.id}
              id={show.id}
              name={show.name}
              image={show.image?.medium || null}
            />
          );
        })}
      </div>
    </main>
  );
}
