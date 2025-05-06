import Grid4 from '@/components/Grid4';
import ActorList from '@/components/ActorList';

export default async function Home() {
  const shows = await fetch('https://api.tvmaze.com/shows?page=1').then(res => res.json());

  const tenActors = (await fetch('https://api.tvmaze.com/people?page=1').then(res => res.json())).splice(0, 10);

  const lastShow = shows.slice(0, 4).map((show: any) => ({
    id: show.id,
    name: show.name,
    image: show.image?.medium || null
  }))

  const lastActors = tenActors.map((actor: any) => ({
    id: actor.id,
    name: actor.name,
    image: actor.image?.medium || null
  }))

  const randomFetch = await Promise.all([
    fetchRandomShow(),
    fetchRandomShow(),
    fetchRandomShow(),
    fetchRandomShow()
  ]);
  
  const randomShow = randomFetch.map((show) => ({
    id: show.id,
    name: show.name,
    image: show.image?.medium || null,
  }));
  
  return (
    <main className="p-8">
      <div className='flex flex-col gap-4 mx-auto w-9/10 md:w-3/4 lg:w-1/3'>
        <Grid4 title="Nos dernières séries" showList={lastShow} />
        <hr className='my-4 text-white' />
        <Grid4 title="Des Séries Aléatoires" showList={randomShow} />
        <hr className='my-4 text-white' />
      </div>
      <div className='flex flex-col gap-4 mx-auto w-9/10'>
        <ActorList title="Quelques Acteurs" list={lastActors} />
      </div>
    </main>
  );
}

function randomNumberGenerator(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
} 

async function fetchRandomShow() {
  let show = null;

  do {
    const id = randomNumberGenerator(0, 100000);
    try {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const data = await res.json();

      if (data && data.id && data.name) {
        show = data;
      }
    } catch (err) {
    }
  } while (!show);

  return show;
}