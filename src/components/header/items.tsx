import { Heading } from "@chakra-ui/react"

type ItemProps = {
  title: string;
}

const Item = ({ title }: ItemProps) => {

  return (
    <Heading cursor='pointer' color='text' as='h2' size='sm' isTruncated>
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