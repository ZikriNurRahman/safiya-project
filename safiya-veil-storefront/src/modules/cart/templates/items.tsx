import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  return (
    <div>
      <div className="pb-4 flex items-center border-b" style={{ borderColor: "#e8e0d5" }}>
        <h2
          className="text-xl font-light tracking-wide"
          style={{ color: "#1a1a1a" }}
        >
          Keranjang Belanja
        </h2>
      </div>

      <Table>
        <Table.Header className="border-t-0">
          <Table.Row style={{ borderColor: "#e8e0d5" }}>
            <Table.HeaderCell
              className="!pl-0 text-xs tracking-[0.1em] uppercase font-semibold"
              style={{ color: "#1a1a1a" }}
            >
              Produk
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell
              className="text-xs tracking-[0.1em] uppercase font-semibold"
              style={{ color: "#1a1a1a" }}
            >
              Jumlah
            </Table.HeaderCell>
            <Table.HeaderCell
              className="hidden small:table-cell text-xs tracking-[0.1em] uppercase font-semibold"
              style={{ color: "#1a1a1a" }}
            >
              Harga Satuan
            </Table.HeaderCell>
            <Table.HeaderCell
              className="!pr-0 text-right text-xs tracking-[0.1em] uppercase font-semibold"
              style={{ color: "#1a1a1a" }}
            >
              Total
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items
            ? items
                .sort((a, b) =>
                  (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                )
                .map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                ))
            : repeat(5).map((i) => <SkeletonLineItem key={i} />)}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate