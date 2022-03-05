import { Heading } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { removeAccents } from "../../core/removeAccents";

type ItemProps = {
  title: string;
}

const Item = ({ title }: ItemProps) => {
  const route = useRouter();

  return (
    <Heading
      cursor='pointer'
      color={
        route.asPath.includes(removeAccents(title).toLocaleLowerCase())
          ? 'accentColor'
          : 'text'
      }
      as='h2'
      size='sm'
      isTruncated
    >
      {title}
    </Heading>
  )
}

export const Items = () => {
  return (
    <>
      <Item title="Overview" />
      <Item title="Saídas" />
      <Item title="Entradas" />
      <Item title="Onde tenho dinheiro" />
      <Item title="Entrar" />
    </>
  )
}