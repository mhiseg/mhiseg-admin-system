import React from "react";
import { Grid, Row, Column} from "carbon-components-react";
import style from "./extension.scss";
import { useTranslation } from "react-i18next";
import { useConfig } from "@openmrs/esm-framework";

export interface ExtensionProps {
  title1: string;
  title2: string;
}
export const Extension: React.FC<ExtensionProps> = (props) => {
  const config = useConfig();
  const { t } = useTranslation();

  return (
    <Grid className={style.extensionContent}>
      <Row className={style.pm0}>
        <Column sm={1} md={1} lg={1} className={style.pm0}>
        </Column>

        <Column className={style.pm0} sm={3} md={7} lg={11}>
          <div>
            <p className={style.title1}> {t(props.title1)} </p>
            <p className={style.title2}> {t(props.title2)} </p>
          </div>
        </Column>
      </Row>
    </Grid>
  );
};
