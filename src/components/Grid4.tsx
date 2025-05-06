import ShowCard from "./ShowCard";

type Show = {
  id: number,
  name: string,
  image: string | null;
}

type ShowList = [
  card1: Show,
  card2: Show,
  card3: Show,
  card4: Show
]

type GridShow = {
    title: string,
    showList: any
  };


  export default function Grid4({title, showList}: GridShow) {
    return (
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
        <div className="grid grid-cols-2 gap-6">
          {showList.map((card : Show) => (
            <ShowCard
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.image}
            />
          ))}
        </div>
      </div>
    );
  }