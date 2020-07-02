import { smallScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

import * as React from "react";
import Media from "react-media";

import CostRow from "./CostRow";
import ProductRow, { EditableProductRowProps } from "./ProductRow";

interface TableProps extends EditableProductRowProps {
  lines: any[];
  subtotal: React.ReactNode;
  deliveryCost?: React.ReactNode;
  totalCost?: React.ReactNode;
  discount?: React.ReactNode;
  discountName?: any;
  payCost?: React.ReactNode;
  balanceCost?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({
  subtotal,
  deliveryCost,
  balanceCost,
  totalCost,
  discount,
  discountName,
  lines,
  payCost,
  ...rowProps
}) => {
  const [VIPQurbaniCategory, setVIPQurbaniCategory] = React.useState(null);

  return (
    <Media query={{ minWidth: smallScreen }}>
      {mediumScreen => (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Products</th>
              {mediumScreen && <th>Price</th>}
              {VIPQurbaniCategory !== "VIP Qurbani" ? (
                <th>Size</th>
              ) : (
                <th>Delivery Date</th>
              )}
              <th className="cart-table__quantity-header">Quantity</th>
              <th colSpan={2}>{mediumScreen ? "Total Price" : "Price"}</th>
            </tr>
          </thead>
          <tbody>
            {lines.map(line => {
              setVIPQurbaniCategory(line.product.category.name);
              return (
                <ProductRow
                  key={line.id}
                  line={line}
                  mediumScreen={mediumScreen}
                  deliveryDate={discountName && discountName.deliveryDate}
                  {...rowProps}
                />
              );
            })}
          </tbody>
          <tfoot>
            <CostRow
              mediumScreen={mediumScreen}
              heading="Subtotal"
              cost={subtotal}
            />
            {discount && (
              <CostRow
                mediumScreen={mediumScreen}
                // heading={`Discount: ${discountName}`}
                heading="Discount"
                cost={discount}
              />
            )}
            {VIPQurbaniCategory === "VIP Qurbani" && (
              <CostRow
                mediumScreen={mediumScreen}
                heading="Pay"
                cost={payCost}
              />
            )}
            {deliveryCost && (
              <CostRow
                mediumScreen={mediumScreen}
                heading="Delivery Cost"
                cost={deliveryCost}
              />
            )}
            {VIPQurbaniCategory === "VIP Qurbani" && (
              <CostRow
                mediumScreen={mediumScreen}
                heading="Balance"
                cost={balanceCost}
              />
            )}
            {totalCost && (
              <CostRow
                mediumScreen={mediumScreen}
                heading="Total Cost"
                cost={totalCost}
              />
            )}
          </tfoot>
        </table>
      )}
    </Media>
  );
};

export default Table;
