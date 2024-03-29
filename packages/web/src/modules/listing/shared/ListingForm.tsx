import * as React from 'react';
import { Form, Button } from 'antd';
import { Formik, FormikHelpers } from 'formik';
import ImageFile from 'react-dropzone';
import { Link } from 'react-router-dom';

import { Page1 } from './ui/Page1';
import { Page2 } from './ui/Page2';
import { Page3 } from './ui/Page3';

export interface ListingFormValues {
  pictureUrl: string | null;
  picture: typeof ImageFile | null;
  name: string;
  category: string;
  description: string;
  price: number;
  beds: number;
  guests: number;
  latitude: number;
  longitude: number;
  amenities: string[];
}

interface State {
  page: number;
}

interface Props {
  initialValues?: ListingFormValues;
  submit: (data: ListingFormValues, actions: FormikHelpers<ListingFormValues>) => Promise<void>;
}

const pages = [<Page1 />, <Page2 />, <Page3 />];

export const defaultListingFormValues = {
  pictureUrl: null,
  picture: null,
  name: '',
  category: '',
  description: '',
  price: 0,
  beds: 0,
  guests: 0,
  latitude: 0,
  longitude: 0,
  amenities: [],
};

export class ListingForm extends React.PureComponent<Props, State> {
  state = {
    page: 0,
  };

  nextPage = () => this.setState((state) => ({ page: state.page + 1 }));

  render() {
    const { submit, initialValues = defaultListingFormValues } = this.props;
    return (
      <div style={{ margin: '0 auto', maxWidth: 400 }}>
        <Formik<ListingFormValues> initialValues={initialValues} onSubmit={submit}>
          {(props) => (
            <Form
              name="login"
              className="abb-create-listing__form"
              onFinish={props.handleSubmit as any}
            >
              <Link to="/logout">Logout</Link>
              {pages[this.state.page]}
              <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {this.state.page === pages.length - 1 ? (
                    <div>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="abb-create-listing__submit-button"
                        disabled={props.isSubmitting}
                      >
                        Create listing
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="primary"
                      className="abb-create-listing__button"
                      onClick={this.nextPage}
                    >
                      Next page
                    </Button>
                  )}
                </div>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
