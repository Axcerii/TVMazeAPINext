import ActorCard from "./ActorCard";

type Actor = {
    id: number,
    name: string,
    image: string | null;
    character?: string;
  }

  export default function ActorList(props: {title: String, list: Actor[]}) {
    return (
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-bold mb-6 text-white">{props.title}</h2>
        <div className="flex gap-6 overflow-x-scroll w-full mb-2">
          {props.list.map((card : Actor) => (
            <ActorCard
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.image}
              character={card.character}
            />
          ))}
        </div>
      </div>
    );
  }