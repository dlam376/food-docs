function generateSidebar() {
  let max_cengji = 1; //默认展开层级深度
  //添加箭头
  $(".sidebar-nav")
    .find("li")
    .each(function (i, e) {
      var el = e;
      if (el.nextSibling && el.nextSibling.tagName == "UL") {
        $(el)
          .addClass("sidebar-nav-parent-li")
          .append(
            "<div class='ul-after'><div class='ul-after-sanjiao'></div></div>"
          );
      }
    });

  //初始时候展开层级
  function find_children_li(dom, current_cengji) {
    if (dom) {
      current_cengji++;
      $(
        $(dom)
          .find("li")
          .each(function (i, e) {
            var el = e;
            if (el.nextSibling && el.nextSibling.tagName == "UL") {
              if (current_cengji >= max_cengji) {
                $(el.nextSibling).hide();
                $(el).addClass("sidebar-nav-parent-li-shouqi");
              }
              find_children_li(el.nextSibling, current_cengji);
            }
          })
      );
    } else {
      return;
    }
  }

  find_children_li($(".sidebar-nav")[0], 0);

  // 绑定事件
  $(".ul-after-sanjiao").on("click", function (e) {
    showChildren(e);
  });

  // 绑定标题点击事件
  $(".sidebar-nav li a").on("click", function(e) {
    // 只有当点击的是有子菜单的标题时才处理
    if ($(this).parent().hasClass("sidebar-nav-parent-li")) {
      // 先处理展开/折叠
      var fakeEvent = {
        target: $(this).parent().find(".ul-after-sanjiao")[0],
        stopPropagation: function() {},
        preventDefault: function() {}
      };
      showChildren(fakeEvent);
      
      // 然后允许默认的链接跳转行为
      // 不需要阻止事件或阻止默认行为
    }
    // 如果没有子菜单，让链接正常跳转
  });


  // 展开
  function showChildren(e) {
    e.stopPropagation();
    e.preventDefault();
    var el = e.target.parentNode.parentNode.nextSibling;
    if (el) {
      $(el).toggle();
      if (
        $(e.target.parentNode.parentNode).hasClass(
          "sidebar-nav-parent-li-shouqi"
        )
      ) {
        $(e.target.parentNode.parentNode).removeClass(
          "sidebar-nav-parent-li-shouqi"
        );
      } else {
        $(e.target.parentNode.parentNode).addClass(
          "sidebar-nav-parent-li-shouqi"
        );
      }
    }
  }
}
