import ShowCard from "@/components/ShowCard";

export default async function ActorDetails({ params }: { params: { id: string } }) {
  const res = await fetch(`https://api.tvmaze.com/people/${params.id}/castcredits?embed=show`);
  const actor = await fetch(`https://api.tvmaze.com/people/${params.id}`).then(res => res.json());
  const data = await res.json();

  return (
    <main className="p-4 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">{actor.name}</h1>
      <div className="flex flex-col md:flex-row gap-6">

        {actor.image && (
          <img src={actor.image.original} alt={actor.name} className="mb-4 rounded-lg w-9/10 md:w-1/3 lg:w-1/6 mx-auto"/>
        )}

        <div className="my-auto md:w-1/2">
          <h2 className="text-2xl font-bold mb-6 hidden md:block">Informations Complémentaires :</h2>
          <p>Genre : {traductionGenre(actor.gender)}</p>
          <p>Naissance : {convertDate(actor.birthday)}</p>
          {actor.deathday && <p>Mort : {convertDate(actor.deathday)}</p>}
        </div>


      </div>

      <h2
        className="text-3xl font-bold my-6 text-center">Séries principales</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:w-2/3 mx-auto gap-6">
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

function traductionGenre(genre: string) {
  switch (genre) {
    case 'Male':
      return 'Homme';
    case 'Female':
      return 'Femme';
    default:
      return genre;
  }
}

function convertDate(date: string) {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
}