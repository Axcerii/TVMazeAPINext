type ShowCardProps = {
    id: number;
    name: string;
    image: string | null;
  };
  
  export default function ShowCard({ id, name, image }: ShowCardProps) {
    return (
      <a
        href={`/shows/${id}`}
        className="bg-white shadow hover:scale-105 transition block relative"
      >
        {image ? (
          <div className="aspect-square overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="aspect-square overflow-hidden">
            <img src="https://placehold.co/480x480/DD3030/FFF?text=🚫" alt="Pas d'image disponible"/>
          </div>
        )}
        <div className="px-4 absolute bottom-4 bg-[#00000080] w-full">
          <h2 className="text-md text-white text-center">{name}</h2>
        </div>
      </a>
    );
  }