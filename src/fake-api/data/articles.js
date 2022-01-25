import { categories } from './categories.js';

import { articles as frontendJavascriptArticles } from './frontend/javascript.js';
import { articles as frontendVueArticles } from './frontend/vue.js';
import { articles as frontendReactArticles } from './frontend/react.js';

import { articles as backendJavaArticles } from './backend/java.js';
import { articles as backendPythonsArticles } from './backend/python.js';
import { articles as backendGoArticles } from './backend/go.js';

import { articles as androidFlutterArticles } from './android/flutter.js';
import { articles as androidJavaArticles } from './android/java.js';
import { articles as androidKotlinArticles } from './android/kotlin.js';

import { articles as iosSwiftArticles } from './ios/swift.js';
import { articles as iosFlutterArticles } from './ios/flutter.js';
import { articles as iosObjectiveCArticles } from './ios/object-c.js';

import { content as content1 } from './content/content1.js';
import { content as content2 } from './content/content2.js';
import { content as content3 } from './content/content3.js';
import { content as content4 } from './content/content4.js';
import { content as content5 } from './content/content5.js';

function appendCategoryInfo(articles, categoryId) {
  for (const first of categories) {
    for (const second of first.children || []) {
      if (second.category_id === categoryId) {
        return articles.map(a => ({
          ...a,
          category_info: {
            first_category_id: first.category_id,
            first_category_name: first.category_name,
            second_category_id: second.category_id,
            second_category_name: second.category_name,
          },
        }));
      }
    }
  }
}

const frontendArticles = [
  ...appendCategoryInfo(frontendJavascriptArticles, 21),
  ...appendCategoryInfo(frontendVueArticles, 22),
  ...appendCategoryInfo(frontendReactArticles, 23),
];

const backendArticles = [
  ...appendCategoryInfo(backendJavaArticles, 11),
  ...appendCategoryInfo(backendGoArticles, 13),
  ...appendCategoryInfo(backendPythonsArticles, 12),
];

const androidArticles = [
  ...appendCategoryInfo(androidFlutterArticles, 31),
  ...appendCategoryInfo(androidJavaArticles, 32),
  ...appendCategoryInfo(androidKotlinArticles, 33),
];

const iosArticles = [
  ...appendCategoryInfo(iosFlutterArticles, 43),
  ...appendCategoryInfo(iosObjectiveCArticles, 42),
  ...appendCategoryInfo(iosSwiftArticles, 41),
];

export const articles = [...frontendArticles, ...backendArticles, ...androidArticles, ...iosArticles].map(a => ({
  ...a,
  article_content: [content1, content2, content3, content4, content5][parseInt(a.article_id.slice(-1)) % 5],
}));
