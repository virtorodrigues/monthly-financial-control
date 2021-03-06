import { Heading, useDisclosure } from "@chakra-ui/react"
import Link from "next/link";
import { useRouter } from "next/router";
import { useLoginModalContext } from "../../core/hooks/useLoginModalContext";
import { removeAccents } from "../../core/removeAccents";
import { ItemProps } from "../../core/types";

const Item = ({ title, action }: ItemProps) => {
  const route = useRouter();

  const titleFormatted = removeAccents(title).toLocaleLowerCase().replace(/\s/g, '-');

  if (action) {
    return (
      <Heading
        onClick={action}
        cursor='pointer'
        color={
          route.asPath.includes(titleFormatted)
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

  return (
    <Link href={`/${titleFormatted}`}>
      <Heading color={
        route.asPath.includes(titleFormatted)
          ? 'accentColor'
          : 'text'
      }
        as='a'
        size='sm'
        cursor='pointer'
      >
        {title}
      </Heading>
    </Link>
  )
}

export const Items = () => {
  const { handleOnOpen } = useLoginModalContext();

  return (
    <>
      <Item title="Overview" />
      <Item title="Saídas" />
      <Item title="Entradas" />
      <Item title="Fatura cartão de crédito" />
      <Item title="Meus Bancos" />
      <Item title="Entrar" action={handleOnOpen} />
    </>
  )
}