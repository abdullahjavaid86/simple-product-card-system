import { ChangeEvent, FC } from "react";
import { Col, Form, FormLabel, Row } from "react-bootstrap";

export type ColorFilterProps = {
  colors: string[];
  color: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const ColorFilter: FC<ColorFilterProps> = ({
  colors,
  color,
  onChange,
}) => (
  <Row>
    <Col md={4} sm={8}>
      <FormLabel>Filter by color</FormLabel>
      <Form.Select
        id="color-filter"
        value={color}
        onChange={onChange}
        title="Filter by color"
      >
        <option value="">All</option>
        {colors.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </Form.Select>
    </Col>
  </Row>
);
