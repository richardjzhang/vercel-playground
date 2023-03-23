import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import { Title } from "ui";

interface Params extends ParsedUrlQuery {
  country: string;
}

interface Props {
  country: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // We don't want to specify all possible countries as we get those from the headers
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<unknown, Params> = async ({
  params: { country },
}) => {
  return {
    props: {
      country,
    },
    revalidate: false,
  };
};

export default function EdgeMiddleware({ country }: Props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Title>Where am I?</Title>
      <Image
        className="mt-16"
        src={`/flags/${country}.svg`}
        alt="Flag"
        width={300}
        height={200}
      />
    </div>
  );
}
