const baseAPI = "/api";

const testService = {
  get() {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/tests`)
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((err) => {
          reject(err);
        });
    });
  },

  create(test) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/test`, {
        method: "PUT",
        body: JSON.stringify(test),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((json) => resolve(json))
        .catch((err) => {
          reject(err);
        });
    });
  },

  update(test) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/test`, {
        method: "POST",
        body: JSON.stringify(test),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  destroy(test) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/test/${test.id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default testService;
