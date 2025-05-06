type ShowCardProps = {
    id: number;
    name: string;
    image: string | null;
  };
  
  export default function ShowCard({ id, name, image }: ShowCardProps) {
    return (
      <a
        href={`/shows/${id}`}
        className="bg-white shadow hover:shadow-lg transition block relative"
      >
        {image ? (
          <div className="aspect-square overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="aspect-square bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Pas d'image</span>
          </div>
        )}
        <div className="px-4 absolute bottom-4 bg-[#00000080] w-full">
          <h2 className="text-md text-white text-center">{name}</h2>
        </div>
      </a>
    );
  }