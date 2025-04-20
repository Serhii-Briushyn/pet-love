import NewsItem from "components/NewsItem/NewsItem";
import { NewsItem as NewsItemType } from "types/news/types";

type NewsListProps = {
  items: NewsItemType[];
};

const NewsList: React.FC<NewsListProps> = ({ items }) => {
  if (!items.length) {
    return <p className="text-center">No news found.</p>;
  }

  return (
    <ul className="grid gap-5 mb-11 tablet:grid-cols-2 tablet:mb-15 desktop:grid-cols-3 desktop:gap-x-8 desktop:gap-y-10">
      {items.map((item) => (
        <NewsItem key={item._id} item={item} />
      ))}
    </ul>
  );
};

export default NewsList;
