import $ from 'jquery';
import axios from 'axios';

export const getApiData = (url, setApiData) => {
  return axios.get(url)
    .then((response) => {
      // handle success
      // NOTE: response.data comes back as an array.
      setApiData(response.data);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
};

export const postToApiData = (url, data, cbFailure, cbSuccess) => {
  return axios.post(url, data)
    .then(res => {
      if (res.statusText === 'error') {
        cbFailure(res.data.status, res.data.msg);
      } else if (res.statusText === 'OK') {
        cbSuccess(res.data.status, res.data.msg);
        // TODO: Make a redux fetch for state again so that when we navigate to
        // the profile page, the latest data is shown
      }
    })
    .catch((error) => {
      console.log(error);
      // Perform action based on error
    });
};
export const deleteFromApiData = (url, cbFailure, cbSuccess) => {
  return axios.delete(url)
    .then(res => {
      if (res.statusText === 'error') {
        cbFailure(res.data.status, res.data.msg);
      } else if (res.statusText === 'OK') {
        cbSuccess(res.data.status, res.data.msg);
        // TODO: Make a redux fetch for state again so that when we navigate to
        // the profile page, the latest data is shown
      }
    })
    .catch((error) => {
      console.log(error);
      // Perform action based on error
    });
};

// Get random users. See:  https://randomuser.me/
// https://randomuser.me/documentation#format

export const randomUserPic = () => {
  // Math.random gives you a number between 0 and 1
  const rand = Math.random();
  const randInt = Math.floor(rand * 100); // random Integer between 0 and 100
  const gender = randInt % 2  === 0 ? 'men' : 'women';
  return `https://randomuser.me/api/portraits/thumb/${gender}/${randInt}.jpg`;
};

export const capitalize = (word) => {
  const rest = word.slice(1);
  const firstLtr = word.charAt(0);
  return firstLtr.toUpperCase() + rest.toLowerCase();
};

export const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const updateItems = (items, item) => {
  if (items.includes(item)) {
    return items.filter(i => i !== item);
  }
  return items.concat(item);
};

export const randomUser = (setState) => {
  const user = {
    firstname: 'hello',
    lastname: 'world',
    picture: 'https://images.cdn.stuff.tv/sites/stuff.tv/files/avatar.png'
  };
  const setUserInfo = (data) => {
    user.firstname = capitalize(data.results[0].name.first);
    user.lastname = capitalize(data.results[0].name.last);
    user.picture = data.results[0].picture.thumbnail;
    setState(user);
  };
  $.ajax({
    url: 'https://randomuser.me/api/?nat=us',
    dataType: 'json',
    success(data) {
      setUserInfo(data);
    }
  });
};

export const getPageName = (url) => {
  return url.split('/').pop();
};

export const dateFormatted = dateStr => {
  if (!dateStr) return '';

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  // The split is to chop off the day of the week
  const formatted = new Date(dateStr).toLocaleDateString('en-US', options).split(/,(.+)/)[1];
  return formatted;
};

export const decodeHTMLEntities = (text) => {
  const entities = [
    ['amp', '&'],
    ['apos', '\''],
    ['#x27', '\''],
    ['#x2F', '/'],
    ['#39', '\''],
    ['#47', '/'],
    ['lt', '<'],
    ['gt', '>'],
    ['nbsp', ' '],
    ['quot', '"']
  ];

  for (let i = 0; i < entities.length; i += 1)  {
    text = text.replace(
      new RegExp(`&${entities[i][0]};`, 'g'),
      entities[i][1]
    );
  }
  return text;
};

export const contributorIds = (contributors, field) => {
  return  Object.keys(contributors).filter(key => {
    return contributors[key] && contributors[key][field];
  });
};

// This function is used for displaying community tags properties
export const slug2Name = (slug, singularize) => {

  const capitalized = slug.split('-')
    .reduce((acc, curr) => {
      const currCapitalized = curr.charAt(0).toUpperCase() + curr.slice(1);
      return `${acc}${currCapitalized} `;
    },
    '');

  const final = singularize ?
    capitalized.slice(0, -2) 
    :
    capitalized.slice(0, -1); // because there's an extra space at the end of capitalized

  return final;
};

// The function matches the most common cases
export const isStrUrl = str => {
  const matchTld = /(\.com|\.org|\.net|\.edu|\.gov|\.mil|\.io|\.ly|\.ai|\.my|\.co|\.exchange|\.me|\.app|\.gl|\.us|\.de|\.fr|\.is|\.co.uk)/i
  const matchWWW = /(\www.)/i;
  const matchHTTP = /(http:|https:)/i;
  return matchTld.test(str) || matchWWW.test(str) || matchHTTP.test(str);
};

const collapseConsec = arr => {
  let buffer = "";
  let newArr = [];
  arr.forEach(elem => {
      if(elem.strType === "text") {
          buffer += elem.value;
      } else {
        newArr.push({value: buffer, strType: "text"});
        newArr.push(elem);
        buffer = "";
      }
  });
  if(buffer.length > 0) {
      newArr.push({value: buffer, strType: "text"});
  }
  return newArr;
}


// Given string, return an array of objects in the following form:
// { value: 'hello world', strType: 'text' }
// { value: 'https://google.com', strType: 'url' }
// Strategy: use string pattern matching
export const parseUrl = longStr => {
  const splitOn = /([() \r\n])/;
  const splitStrs = longStr.split(splitOn).map(str => {
    return isStrUrl(str) ? { value: str, strType: 'url'} :
      { value: str, strType: 'text'}
  });


  // collapse consecutive text types in strs

  const strs = collapseConsec(splitStrs)

  let res = [];
  let curr = null;
  let last = null;
  for (let i = 0; i < strs.length; i += 1) {
    curr = strs[i];
    [last] = res.slice(-1);
    if (res.length === 0) {
      // the res array is empty, just push the text obj
      res = res.concat(curr);
    } else if (curr.strType === 'url' || last.strType === 'url') {
      res = res.concat(curr);
    } else if (curr.strType === 'text' && last && last.strType === 'text') {
      // replace last in the res
      const newLast = { value: `${last.value} ${curr.value}`, strType: 'text' };
      // replace last thing in the array
      res.splice(-1);
      res.push(newLast);
    }
  }

  return res;
};
// For links without www or http prepended, the link does not open properly
export const amendHref = href => {
  const match = /^(www\.|http:|https:)/;
  return match.test(href) ? href : `http://${href}`
};
