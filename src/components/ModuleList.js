import React from "react";
import PropTypes from 'prop-types';
import ModuleSdItem from "./ModuleSdItem";

function ModuleList({ Modules }) {
    if (Modules.length) {
        return (
            <section className="modules-list">
                {
                    Modules.map((module) => (
                        <ModuleSdItem key={module.id} id={module.id} {...module} />
                    ))
                }
            </section>
        );
    } else {

        return <div className="modules-list__empty-message">Tidak ada Pelajaran ... </div>
    }
}

ModuleList.propTypes = {
    Modules: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ModuleList;