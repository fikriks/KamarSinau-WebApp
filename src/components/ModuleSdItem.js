import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ModuleSdItem({ id, title, createdAt, body }) {
    return (
        <article className="module-item">
            <h3 className="module-item__title"><Link to={`/sd/module/${id}`}>{title}</Link></h3>
            <p className="module-item__createdAt">{createdAt}</p>
            <p className="module-item__body">{body}</p>
        </article>
    );
}

ModuleSdItem.propTypess = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}

export default ModuleSdItem;