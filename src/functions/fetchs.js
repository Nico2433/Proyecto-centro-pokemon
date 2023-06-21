import PropTypes from 'prop-types';

/**
 * Fetches data from the specified URL using the GET method.
 * @param {string} url - The URL to fetch the data from.
 * @returns {Promise} - A Promise that resolves to the parsed JSON response.
 */
function fetchGet(url) {
    return fetch(url)
        .then(resp => resp.json())
        .catch(err => console.error(err));
}

// PropTypes
fetchGet.propTypes = {
    url: PropTypes.string.isRequired
};

export default fetchGet;