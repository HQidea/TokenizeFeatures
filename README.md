# Tokenize Features

Tokenize the features argument based on the [spec](https://html.spec.whatwg.org/multipage/nav-history-apis.html#concept-window-open-features-tokenize).

## Usage

```
import TokenizeFeatures from 'tokenize-features'

const features = new TokenizeFeatures('width=100,height=200,popup');

features.get('width'); // 100
features.get('height'); // 200

features.isSet('popup'); // true
```