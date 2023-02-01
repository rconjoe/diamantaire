import React, { PureComponent, useEffect, useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import emitDataLayer, {
  GTM_EVENTS,
} from '../components/document/gtm/emitDataLayer';
import { useSession } from 'next-auth/client';
import { getAccountDetails } from '../store/selectors/account';

// SessionEmail

class SessionEmail extends PureComponent {
  constructor(props) {
    super(props);
  }

  emitDataLayerEmail() {
    const { customerId, email } = this.props;

    const dataLayerVariables = {
      event: GTM_EVENTS.viewPageLoggedIn,
      email,
      customerId,
      // pageType: "",
      // siteSection: ""
    };

    emitDataLayer({ dataLayerVariables });
  }

  componentDidMount() {
    this.emitDataLayerEmail();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.events !== this.props.events) {
      Router.events.on('routeChangeComplete', this.handleRouteChange);
    }
  }

  handleRouteChange = () => {
    this.emitDataLayerEmail();
  };

  render() {
    return null;
  }
}

SessionEmail.propTypes = {
  email: PropTypes.string,
  events: PropTypes.string,
  customerId: PropTypes.string,
};

// SessionHOC

const SessionHOC = props => {
  const [currentEmail, setCurrentEmail] = useState(null);
  const [session] = useSession();
  const isSignedIn = Boolean(session);
  const customerId = (isSignedIn && props.customerId) || '';

  useEffect(() => {
    const email = isSignedIn ? session?.user?.email : '';

    setCurrentEmail(email);
  }, [isSignedIn, session]);

  if (currentEmail !== null) {
    return (
      <SessionEmail
        email={currentEmail}
        events={Router.events}
        customerId={customerId}
      />
    );
  } else {
    return null;
  }
};

SessionHOC.propTypes = {
  customerId: PropTypes.string,
};

const mapStateToProps = state => {
  const account = getAccountDetails(state);

  const customerId = account?.customerId || '';

  return {
    customerId,
  };
};

export default connect(mapStateToProps)(SessionHOC);
