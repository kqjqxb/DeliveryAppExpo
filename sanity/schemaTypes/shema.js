import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import category from './category';
import restaurant from './restaurant';
import dish from './dish';
import featured from './featured';
import categoryForRestScreen from './foodCategoryForRest';

export default createSchema({
    name: 'default',

    types: schemaTypes.contact([
        restaurant,
        category,
        dish,
        featured,
        categoryForRestScreen,
    ]),
})