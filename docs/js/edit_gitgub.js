(function (win) {
  function isFunction(functionToCheck) {
    return (
      functionToCheck &&
      {}.toString.call(functionToCheck) === "[object Function]"
    );
  }

  win.EditOnGithubPlugin = {};

  function create(docBase, docEditBase, title) {
    title = title || "编辑";
    docEditBase = docEditBase || docBase.replace(/\/blob\//, "/edit/");

    function editDoc(event, vm) {
      var docName = vm.route.file;

      if (docName) {
        var editLink = docEditBase + docName;
        window.open(editLink);
        event.preventDefault();
        return false;
      } else {
        return true;
      }
    }

    win.EditOnGithubPlugin.editDoc = editDoc;
    win.EditOnGithubPlugin.refresh = function (event, vm) {
      let filePath = vm.route.file.split("/");
      let fileName = filePath[filePath.length - 1].split(".")[0];
      localStorage.removeItem(fileName);
      event.preventDefault();
      window.location.reload();
    };
    win.EditOnGithubPlugin.add = function (event, vm) {
      let filePath = vm.route.file.split("/");
      let fileName = filePath[filePath.length - 1].split(".")[0];
      event.preventDefault(); // 阻止链接默认行为
      showFormModal(fileName);
    };
    function generateHeader(title) {
      return (header = [
        '<div style="overflow: auto">',
        '<p style="float: left; margin-right: auto;"><a style="text-decoration: underline; cursor: pointer"',
        'onclick="EditOnGithubPlugin.onClick(event)">',
        title,
        "</a></p>",
        '<p style="float: left; margin-left: 10px;"><a style="text-decoration: underline; cursor: pointer"',
        'onclick="EditOnGithubPlugin.refreshPage(event)">',
        "刷新",
        "</a></p>",
        '<p class="add_form" style="float: left; margin-left: 10px;"><a style="text-decoration: underline; cursor: pointer"',
        'onclick="EditOnGithubPlugin.addForm(event)">',
        "添加",
        "</a></p>",

        "</div>",
      ].join(""));
    }

    return function (hook, vm) {
      win.EditOnGithubPlugin.onClick = function (event) {
        EditOnGithubPlugin.editDoc(event, vm);
      };

      win.EditOnGithubPlugin.refreshPage = function (event) {
        EditOnGithubPlugin.refresh(event, vm);
      };

      win.EditOnGithubPlugin.addForm = function (event) {
        EditOnGithubPlugin.add(event, vm);
      };

      if (isFunction(title)) {
        hook.afterEach(function (html) {
          return generateHeader(title(vm.route.file)) + html;
        });
      } else {
        var header = generateHeader(title);

        hook.afterEach(function (html) {
          return header + html;
        });
      }
    };
  }

  win.EditOnGithubPlugin.create = create;
})(window);
