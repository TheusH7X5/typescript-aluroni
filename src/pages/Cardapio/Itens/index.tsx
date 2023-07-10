import cardapio from 'data/cardapio.json';
import Item from './Item';
import styles from './Itens.module.scss';
import { useEffect, useState } from 'react';
import { Cardapio } from 'types/Prato';
import { Prato } from 'types/Prato';

interface Props {
  busca: string;
  filtro: number | null;
  ordenador: string;
}

export default function Itens(props: Props) {
  const [lista, setLista] = useState(cardapio);
  const { busca, filtro, ordenador } = props;

  // const ordenarPropriedadeCrescente = (
  //   lista: Cardapio,
  //   propriedade: ‘size’ | ‘serving’ | ‘price’
  // ) => {
  //   return lista.sort((a, b) => (a[propriedade] > b[propriedade] ? 1 : -1));
  // };

  // const ordenarPropriedadeCrescente = (
  //   lista: Cardapio,
  //   propriedade: keyof Pick<Prato, 'size' | 'serving' | 'price'>
  // ) => {
  //   return lista.sort((a, b) => (a[propriedade] > b[propriedade] ? 1 : -1));
  // };

  useEffect(() => {
    function ordenar(novaLista: Cardapio) {
      switch (ordenador) {
      case 'opcao':
        return novaLista.sort((a, b) => (a.size > b.size ? 1 : -1));
      case 'qtd_pessoas':
        return novaLista.sort((a, b) => (a.serving > b.serving ? 1 : -1));
      case 'preco':
        return novaLista.sort((a, b) => (a.price > b.price ? 1 : -1));
      default:
        return novaLista;
      }
    }

    function testaBusca(title: string) {
      const regex = new RegExp(busca, 'i');
      return regex.test(title);
    }

    function testaFiltro(id: number | null) {
      if (filtro !== null) return filtro === id;
      return true;
    }

    const novaLista = cardapio.filter(
      (item) => testaBusca(item.title) && testaFiltro(item.category.id)
    );

    setLista(ordenar(novaLista));
  }, [busca, filtro, ordenador]);

  return (
    <div className={styles.itens}>
      {lista.map((item) => (
        <Item {...item} key={item.id} />
      ))}
    </div>
  );
}
