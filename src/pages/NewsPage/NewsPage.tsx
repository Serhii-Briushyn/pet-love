import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchNews } from "store/news/operations";
import { selectNews, selectPage, selectTotalPages } from "store/news/selectors";
import { setPage } from "store/news/slice";
import { AppDispatch } from "store/store";
import Title from "components/Title/Title";
import NewsList from "components/NewsList/NewsList";
import Pagination from "components/Pagination/Pagination";
import SearchField from "components/SearchField/SearchField";

const NewsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const news = useSelector(selectNews);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchNews({ page, keyword })).unwrap();
      } catch (error) {
        toast.error(error as string);
      }
    };
    fetchData();
  }, [dispatch, page, keyword]);

  const handleSearch = (value: string) => {
    setKeyword(value);
    dispatch(setPage(1));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container m-auto flex flex-col px-5 pt-28.5 pb-20 tablet:px-8 tablet:pt-42 desktop:px-16 desktop:pt-44.5">
      <div className="flex flex-col gap-5 mb-6 tablet:flex-row tablet:justify-between desktop:items-center tablet:mb-11 desktop:mb-18.5">
        <Title page="news" />
        <SearchField onSearch={handleSearch} />
      </div>

      <NewsList items={news} />

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default NewsPage;
