import { NewsItem as NewsItemType } from "types/news/types";

type Props = {
  item: NewsItemType;
};

const NewsItem: React.FC<Props> = ({ item }) => {
  const { title, text, date, url, imgUrl } = item;

  return (
    <li className="flex flex-col gap-5 tablet:gap-7">
      {imgUrl && (
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-47.5 object-cover rounded-2xl tablet:h-56.5"
          loading="lazy"
        />
      )}

      <div>
        <h3 className="text-base font-bold mb-3 line-clamp-2 tablet:min-h-14 tablet:text-xl tablet:mb-3.5">
          {title}
        </h3>

        <p className="mb-5 line-clamp-4 tablet:min-h-24 tablet:mb-7">{text}</p>

        <div className="flex justify-between items-center">
          <span className="text-black/50">
            {(() => {
              const d = new Date(date);
              const day = String(d.getDate()).padStart(2, "0");
              const month = String(d.getMonth() + 1).padStart(2, "0");
              const year = d.getFullYear();
              return `${day}/${month}/${year}`;
            })()}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline cursor-pointer transition-all duration-200 ease-in hover:text-primary-hover"
          >
            Read more
          </a>
        </div>
      </div>
    </li>
  );
};

export default NewsItem;
