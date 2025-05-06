type ActorCard = {
    id: number;
    name: string;
    image: string | null;
    character?: string;
  };
  
  export default function ActorCard({ id, name, image, character }: ActorCard) {
    return (
      <a
        href={`/actors/${id}`}
        className="bg-[var(--secondary)] shadow hover:shadow-lg transition block relative w-52 p-4 my-4 flex-shrink-0 rounded-lg border border-solid border-white"
      >

        {image ? (
            <img src={image} alt={name} className="w-full object-cover" />
        ) : (
            <div className="bg-green-900 flex items-center justify-center">
            <span className="text-gray-200 text-sm">Pas d'image</span>
          </div>
        )}
          <h3 className="text-md text-white text-center py-2">{name}</h3>

          {character? (
          <p className="text-sm text-white text-center">{character}</p>
        ): (
            <div></div>
        )}
      </a>
    );
  }