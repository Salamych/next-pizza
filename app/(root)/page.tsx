
import { Container, Filters, ProductsGroupList, Title, TopBar, Stories } from "@/shared/components/shared";
import { findPizzas } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/find-pizzas";
import { Suspense } from "react";



export default async function Home({searchParams}: {searchParams: GetSearchParams}) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar
        categories={categories.filter(
          (category) => category.prodcts.length > 0
        )}
      />

      <Stories />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.prodcts.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.prodcts}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

