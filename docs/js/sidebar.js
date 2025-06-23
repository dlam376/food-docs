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

  // 展开
  function showChildren(e) {
    console.log("object");
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
