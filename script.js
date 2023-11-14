let availableTeamMembersRow = 1;
let social_icons =
  "{&quot;1&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/FPs7wAZBGEHNQIUue0wiOOUFXyz791DZxITS9WE6.png&quot;,&quot;2&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/2mg2U7yFJT1psDtFKhXINSIGwatR9AXbcKJt4C9M.png&quot;,&quot;13&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/jAEqARIgX4h5tZKVbFyo8SfhbkcQNugnqJpwRytA.jpg&quot;,&quot;14&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/P9qoPJo1tlihvKCKFTyNIrmJkzNkAC2y94JGn2Zr.png&quot;,&quot;15&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/olq7PXMSGvzCC5xRYqxn27ethETQcd1o6RQvS3qr.png&quot;,&quot;16&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/hmzpIrBZ7rRoGxOBJFkgTABcscBvSEtMjDbJ3iGi.png&quot;,&quot;17&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/EBU1eCZ2mthxiaZXUZ7XGhWqCLyLgkQpelCzXTKX.png&quot;,&quot;18&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/0miWjnBiv8M1jf70HZ1Wq4E1IZOUmC8nUFxJwRjI.webp&quot;,&quot;19&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/R7DOD9mjdeML5EJP0KBHRmNQ2SBZ9vQgKgE7R2g6.png&quot;,&quot;20&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/xlwcY3cDrdPXj3Ag1JX3wyJf3M3lEQzEJ6PAbQjO.png&quot;,&quot;21&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/0oVJYenF85E12mGXQsUDsL0sysvq69IwpOetARW4.png&quot;,&quot;22&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/TzpYyg61w1ok2GajgISHIicci7IdmjM7cahq6fpo.png&quot;,&quot;23&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/JjEIPI21Q0t0G2KAalRoaK4BLlxTaBb3v3WNXFIe.png&quot;,&quot;24&quot;:&quot;https://prepr-preprlabs-prod-bucket.s3.ca-central-1.amazonaws.com/uploads/social_link/X7M48DbR38lln53eX9SKPzevzDdUroNaSLa8C1bz.png&quot;}";
let uploadUrl = "https://preprlabs.org/upload_image";

function checkFutureDate(data) {
  var today = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "numeric",
  });
  const selectedDate = new Date(data);
  const currentDate = new Date(today);
}

function handleIsTeamLeaderRadioBtnClick(e, valNum) {
  $(".team-lead-radio-btn").prop("checked", false);
  $(".team-lead-radio-btn").val("0");
  $("input[name=" + e.name + "]").prop("checked", true);
  $("input[name=" + e.name + "]").val("1");
  $(".is_LeaderTrue").prop("disabled", false);
  handleIDfalse(e, valNum);
}

function handleIDfalse(e, valNum) {
  var selector = "#is_Leader_" + valNum;
  $(selector).prop("disabled", true);
}

function projectViewEditAcess() {
  $(".member_edit_access")
    .on("change", function () {
      this.value = this.checked ? 1 : 0;
    })
    .change();

  $(".member_view_access")
    .on("change", function () {
      this.value = this.checked ? 1 : 0;
    })
    .change();
}

$("#singleChallenge").on("change", function (e) {
  projectDesciptionData();
});
function projectDesciptionData() {
  if ($("#singleChallenge").val != null) {
    console.log($("#singleChallenge").val());
    $.ajax({
      url: "https://preprlabs.org/userprojectRequirements",
      delay: 1000,
      data: {
        challenge_id: $("#singleChallenge").val(),
      },
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
      success: function (data) {
        // For Status Description
        $(".detail_wrap").html(data.viewPage);
        // For Status hide/show
        desCheck = data.challengeData;
        if (desCheck) {
          $("#chal_form").hide();
          var link =
            "<a href='/challengeManager/" +
            desCheck.slug +
            "' target='_blank'>" +
            desCheck.title +
            "</a>";
          link =
            link + '<i id="iconTarget" class="fas fa-external-link-alt"></i>';
          $("#challengeData").html(link);
        }
        checkDescription(desCheck);
      },
    });
  }
}
function checkDescription() {
  toggleScript();
  if (desCheck) {
    $("#showDescription").hide();
    $("#hideDescription").show();
  }
}
function toggleScript() {
  $('[data-toggle="collapse"]').click(function () {
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      $(this).html(
        "<i data-toggle='collapse' data-target='#result_dropdown' class='fa fa-angle-right'></i> &thinsp; Expand Criteria"
      );
    } else {
      $(this).html(
        "<i data-toggle='collapse' data-target='#result_dropdown' class='fa fa-angle-down'></i> &thinsp; Hide Criteria"
      );
    }
  });
}
function handleDeleteMemberRow(index) {
  $("#member_row_" + index).remove();
}

function handleAddMemberRow() {
  availableTeamMembersRow++;
  let num = availableTeamMembersRow;
  let div_id = `member_row_${num}`;
  let select_id = `team_member_${num}`;
  let html = `<tr id=${div_id}>
                <td class="pr-3">
                    <div class="input-group mb-3">
                        <select class="form-control members_select" name="team_member_${num}"></select>
                    </div>
                </td>
                <td class="pr-5">
                    <div class="form-group">
                        <input type="text" name="member_position_${num}" placeholder="Position(s)" class="form-control">
                        <span class="help-block text-danger"></span>
                    </div>
                </td>
                <td class="pr-3">
                    <div class="input-group mb-3">
                        <input type="radio" name="is_team_leader_${num}" class="team-lead-radio-btn" onclick="handleIsTeamLeaderRadioBtnClick(this, ${num})" />
                    </div>
                </td>
                <td class="pr-3">
                    <div class="input-group mb-3">
                        <input type="checkbox" name="member_view_access_${num}" class="member_view_access" onclick="projectViewEditAcess(this)" />
                    </div>
                </td>
                <td class="pr-3">
                    <div class="input-group mb-3">
                        <input type="checkbox" name="member_edit_access_${num}" class="member_edit_access" onclick="projectViewEditAcess(this)" />
                    </div>
                </td>
                <td>
                    <div class="addbtn-row" style="float: right;">
                        <button type="button" id="is_Leader_${num}" value="+" onclick="handleDeleteMemberRow(${num})" class="btn btn-warning add_links is_LeaderTrue">-</button>
                    </div>
                </td>
            </tr>`;
  $("#team-member-list").append(html);

  $(`select[name*=${select_id}]`).select2({
    language: {
      searching: function () {
        return "Searching";
      },
      noResults: function () {
        return "No results found.";
      },
    },
    placeholder: "Team members",
    // tags: true,
    ajax: {
      url: "https://preprlabs.org/api/Memberforproject",
      cache: true,
      delay: 1000,
      data: function (params) {
        var user_email = new Array();
        $(".members_select").each(function () {
          user_email.push($(this).val());
        });
        return {
          search: params.term,
          email: user_email,
        };
      },
      processResults: function (data) {
        let results = data.result;
        return {
          results: results,
        };
      },
    },
  });
}

$(document).on("click", ".closediv", function () {
  $(this).parent().parent().parent().remove();
});

let myOpt = [];

$(".selectname option").each(function () {
  myOpt.push($(this).val());
});

$(".bannerToggleClass").click(function () {
  $("#bannerClass").toggle("500");
  $("i", this).toggleClass("fa-angle-right fa-angle-down");
});
$(".selectname").each(function () {
  let sel = $(this);
  $.each(myOpt, function (key, value) {
    if (value !== "" && value !== sel.val()) {
      sel
        .find("option")
        .filter('[value="' + value + '"]')
        .attr("disabled", false);
    }
  });
});

$(document).ready(function () {
  $("[data-toggle=tooltip]").tooltip();
});

$(".btnFile").click(function () {
  $('input[name="image"]').trigger("click");
});

let loadFile1 = function (event) {
  $(document).on("change", ".loadFile1", function () {
    let output = document.getElementById("output");
    var file = event.target.files[0];
    let imageurl = URL.createObjectURL(event.target.files[0]);
    if (file.type.match("image")) {
      // Check the image resolution
      var image = new Image();
      image.src = imageurl;
      image.onload = () => {
        if (image.width < 625 || image.height < 355) {
          swal(
            "Error!",
            "Please select png, jpg or jpeg image with minimum dimension of width: 625px, height: 355px",
            "error"
          );
          $('input[name="image"]').val("");
          $("#video_url").val("");
          $("body")
            .find("#drag-and-drop-zone")
            .eq(0)
            .attr(
              "style",
              'background:"white" no-repeat;background-size:cover'
            );
          return false;
        }
      };

      $(this)
        .closest("#drag-and-drop-zone")
        .find("video")
        .attr("style", "display: none;");
      $(this).closest("#drag-and-drop-zone").find("video").attr("src", "");
      $("body")
        .find("#drag-and-drop-zone")
        .eq(0)
        .attr(
          "style",
          "background:url(" + imageurl + " ) no-repeat;background-size:cover"
        );
    } else {
      $(this).closest("#drag-and-drop-zone").find("img").attr("src", "");
      $(this)
        .closest("#drag-and-drop-zone")
        .find("video")
        .attr("style", "display: block;");
      // append new video to show
      $("body")
        .find("#drag-and-drop-zone")
        .eq(0)
        .attr(
          "style",
          "background:url(" + imageurl + " ) no-repeat;background-size:cover"
        );
      $(this)
        .closest("#drag-and-drop-zone")
        .find("video")
        .attr("src", imageurl);
    }
    $("#file_type").val(file.type);
  });
};

// init date picker
$(document).ready(function () {
  var date = new Date();
  var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  $("#datepicker").datepicker("setDate", today);

  $("#datepicker").datepicker({
    startDate: today,
    defaultDate: new Date(),
    format: "dd-mm-yyyy",

    autoclose: true,
  });
});

$(document).ready(function () {
  /* Add Member code */
  $(`select[name*="team_member_1"]`).select2({
    language: {
      searching: function () {
        return "Searching";
      },
      noResults: function () {
        return "No results found.";
      },
      inputTooShort: function () {
        return "Please enter 2 or more characters";
      },
    },
    placeholder: "Team member",
    // tags: true,
    ajax: {
      url: "https://preprlabs.org/api/Memberforproject",
      cache: true,
      delay: 1000,
      data: function (params) {
        var user_email = new Array();
        $(".members_select").each(function () {
          user_email.push($(this).val());
        });
        return {
          search: params.term,
          email: user_email,
        };
      },
      processResults: function (data) {
        let results = data.result;
        return {
          results: results,
        };
      },
    },
  });

  /* Associated lab code */
  $(".select2Labs").select2({
    language: {
      searching: function () {
        return "Searching";
      },
      noResults: function () {
        return "No results found.";
      },
      inputTooShort: function () {
        return "Please enter 2 or more characters";
      },
    },
    placeholder: "Select Lab",
    ajax: {
      url: "https://preprlabs.org/api/ProjectLabsforselect2",
      cache: true,
      delay: 1000,
      data: function (params) {
        return {
          id: "15641",
          language: "en",
          challenge_id: $("#singleChallenge").val(),
          search: params.term, // search term
        };
      },
      processResults: function (data) {
        if (data.status == "fail") {
          $("#source_lab_error").show();
          $("#source_lab_error").html(data.message);
        } else {
          return {
            results: data.result,
          };
        }
      },
    },
  });

  /* Associated challenge code */
  $(".select2singleChallenge").select2({
    language: {
      searching: function () {
        return "Searching";
      },
      noResults: function () {
        return "No results found.";
      },
      inputTooShort: function () {
        return "Please enter 2 or more characters";
      },
    },
    placeholder: "Select Challenge",
    ajax: {
      url: "https://preprlabs.org/api/projectChallangesforselect2",
      cache: false,
      delay: 1000,
      data: function (params) {
        return {
          id: "15641",
          language: "en",
          search: params.term, // search term
        };
      },
      processResults: function (data) {
        $("#source_lab_error").hide();
        return {
          results: data.result,
        };
      },
    },
  });

  /* Associated skills code */
  $("#select2Skills").select2({
    language: {
      searching: function () {
        return "Searching";
      },
      noResults: function () {
        return "No results found.";
      },
    },
    placeholder: "Find teammates with these skills",
    ajax: {
      url: "https://preprlabs.org/getskill",
      cache: false,
      delay: 1000,
      data: function (params) {
        return {
          id: "15641",
          search: params.term, // search term
          language: "en",
        };
      },
      processResults: function (data) {
        return {
          results: data.result,
        };
      },
    },
  });
});

const steps = ["c1_ProjectOverview", "c4_TeamBuilding"];
const stepPrgressType = true;

$("#privacy").click(function () {
  if ($(this).is(":checked")) {
    $("#privacy").val("public");
  } else {
    $("#privacy").val("private");
  }
});

$("#file_download_privacy").click(function () {
  if ($(this).is(":checked")) {
    $("#file_download_privacy").val("public");
  } else {
    $("#file_download_privacy").val("private");
  }
});
function enableFileUpload() {
  if (window.File && window.FileList && window.FileReader) {
    $("#image_files").on("change", function (e) {
      var files = e.target.files;
      var filesLength = files.length;

      for (var i = 0; i < filesLength; i++) {
        var f = files[i];
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          var file = e.target;
          $(
            '<span class="pip">' +
              '<img class="imageThumb" src="' +
              e.target.result +
              '" title="' +
              file.name +
              '"/>' +
              '<br/><span class="remove">Remove image</span>' +
              "</span>"
          ).insertAfter("#image_files");
          $(".remove").click(function () {
            $(this).parent(".pip").remove();
          });
        };
        fileReader.readAsDataURL(f);
      }
      console.log(files);
    });

    $("#video_files").on("change", function (e) {
      var files = e.target.files;
      var filesLength = files.length;
      for (var i = 0; i < filesLength; i++) {
        var f = files[i];
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          var file = e.target;
          $(
            '<span class="pip">' +
              '<img class="imageThumb" src="https://icon-library.com/images/videos-icon-png/videos-icon-png-4.jpg"' +
              e.target.result +
              '" title="' +
              file.name +
              '"/>' +
              '<br/><span class="remove">Remove image</span>' +
              "</span>"
          ).insertAfter("#video_files");
          $(".remove").click(function () {
            $(this).parent(".pip").remove();
          });
        };
        fileReader.readAsDataURL(f);
      }
      console.log(files);
    });

    $("#project_files").on("change", function (e) {
      var files = e.target.files;
      var filesLength = files.length;
      for (var i = 0; i < filesLength; i++) {
        var f = files[i];
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          var file = e.target;
          $(
            '<span class="pip">' +
              '<img class="imageThumb" src="https://icon-library.com/images/files-icon-png/files-icon-png-10.jpg"' +
              e.target.result +
              '" title="' +
              file.name +
              '"/>' +
              '<br/><span class="remove">Remove image</span>' +
              "</span>"
          ).insertAfter("#project_files");
          $(".remove").click(function () {
            $(this).parent(".pip").remove();
          });
        };
        fileReader.readAsDataURL(f);
      }
      console.log(files);
    });
  } else {
    alert("notification.notification_filecanu");
  }
}

var _URL = window.URL || window.webkitURL;

function renderStepFormControlls(steps, currentStep, currentIndex) {
  var backButton = $("#pf-step-back");
  var cancelButton = $("#pf-step-cancel");
  var nextButton = $("#pf-step-forward:not(.edit-continue)");
  var editNextButton = $("#pf-step-forward.edit-continue");
  var submitButton = $("#saveChallenge");

  let prevStepIndex = currentIndex - 1;
  let nextStepIndex = currentIndex + 1;

  console.log(
    `Previous Step Index: ${prevStepIndex} and Next Step Index: ${nextStepIndex}`
  );

  if (stepPrgressType) {
    console.log($(".c_step").eq(nextStepIndex));
    $(".c_step").eq(nextStepIndex).removeClass("active");
    $("#" + currentStep + "_step").addClass("active");
  }

  if (prevStepIndex < 0) {
    backButton.hide();
    nextButton.show();
    cancelButton.show();
    editNextButton.show();
    submitButton.hide();
  } else if (nextStepIndex > 4 && nextStepIndex < 5) {
    backButton.show();
    nextButton.show();
    submitButton.show();
    cancelButton.hide();
  } else if (nextStepIndex >= steps.length) {
    backButton.show();
    nextButton.hide();
    editNextButton.hide();
    submitButton.show();
    cancelButton.hide();
  } else {
    backButton.show();
    nextButton.show();
    editNextButton.show();
    submitButton.hide();
    cancelButton.hide();
  }
}

function backStepAction(stepList, steps) {
  let currentStep = stepList.data("current-step");
  let currentIndex = steps.indexOf(currentStep);

  let prevStepIndex = currentIndex - 1;
  if (prevStepIndex < 0) return false;

  let prevStep = steps[prevStepIndex];
  let currentStepSection = $("#" + currentStep);
  let prevStepSection = $("#" + prevStep);
  currentStepSection.removeClass("current");
  prevStepSection.addClass("current");
  stepList.data("current-step", prevStep);
  renderStepFormControlls(steps, prevStep, prevStepIndex);
}

function nextStepAction(stepList, steps) {
  let currentStep = stepList.data("current-step");
  let currentIndex = steps.indexOf(currentStep);

  let nextStepIndex = currentIndex + 1;
  if (nextStepIndex >= steps.length) return false;

  window.scrollTo({ top: 0, behavior: "smooth" });

  let nextStep = steps[nextStepIndex];
  let currentStepSection = $("#" + currentStep);
  let nextStepSection = $("#" + nextStep);
  currentStepSection.removeClass("current");
  nextStepSection.addClass("current");
  stepList.data("current-step", nextStep);
  renderStepFormControlls(steps, nextStep, nextStepIndex);
}

function isSupportedBrowser() {
  return window.File && window.FileReader && window.FileList && window.Image;
}

function getSelectedFile() {
  var fileInput = document.getElementById("filePicker");
  var fileIsSelected = fileInput && fileInput.files && fileInput.files[0];
  if (fileIsSelected) return fileInput.files[0];
  else return false;
}

function createImageObjectUrl(file) {
  let binaryData = [];
  binaryData.push(file);

  // Store Object URL
  let objectUrl = false;

  // MIME: jpeg
  try {
    objectUrl = _URL.createObjectURL(
      new Blob(binaryData, { type: "image/jpeg" })
    );
  } catch (error) {}

  // MIME: jpg
  if (!objectUrl)
    try {
      objectUrl = _URL.createObjectURL(
        new Blob(binaryData, { type: "image/jpg" })
      );
    } catch (error) {}

  // MIME: png
  if (!objectUrl)
    try {
      objectUrl = _URL.createObjectURL(
        new Blob(binaryData, { type: "image/png" })
      );
    } catch (error) {}

  // MIME: bmp
  if (!objectUrl)
    try {
      objectUrl = _URL.createObjectURL(
        new Blob(binaryData, { type: "image/bmp" })
      );
    } catch (error) {}

  // MIME: bmp
  if (!objectUrl)
    try {
      objectUrl = _URL.createObjectURL(
        new Blob(binaryData, { type: "image/gif" })
      );
    } catch (error) {}

  // Return Object URL
  return objectUrl;
}

function isGoodImage(file) {
  var deferred = jQuery.Deferred();
  var image = new Image();

  image.onload = function () {
    // Check if image is bad/invalid
    if (this.width + this.height === 0) {
      this.onerror();
      return;
    }

    // Check the image resolution
    if (this.width >= 735 && this.height >= 415) {
      deferred.resolve(true);
    } else {
      swal("Error!", __("notification.notification_select_image"), "error");
      deferred.resolve(false);
    }
  };

  image.onerror = function () {
    swal("Error!", __("notification.notification_select_image"), "error");
    deferred.resolve(false);
  };

  let imageObjectUrl = createImageObjectUrl(file);

  if (imageObjectUrl) {
    image.src = imageObjectUrl;
  } else {
    swal("Error!", __("notification.notification_select_image"), "error");
    deferred.resolve(false);
  }

  return deferred.promise();
}

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

function timelineValidation() {
  let time_line_selection = $('input[name="dates"]:checked').val();

  let validation_element;
  let skip_validation_element;

  let restricted_dates_elements = $(
    "div:not(#appendCustomDate) .restricted-date-validation"
  );
  let flexible_dates_elements = $(
    "div:not(#appendCustomDate) .flexible-date-validation"
  );

  // Restricted dates
  if ("restricted" == time_line_selection) {
    validation_element = restricted_dates_elements;
    skip_validation_element = flexible_dates_elements;

    console.log("Restricted Date Validation Started");
  }

  // Flexible Date
  else {
    validation_element = flexible_dates_elements;
    skip_validation_element = restricted_dates_elements;

    console.log("Flexible Date Validation Started");
  }

  try {
    // Enable Validation
    validation_element.each(function () {
      let ele = $(this);

      let announcementBased = ele.data("announcement-based");
      console.log("Announcement Based: " + announcementBased);

      if (
        typeof announcementBased !== "undefined" &&
        "yes" == announcementBased
      ) {
        let is_selected = ele
          .parents(".removeCustomDate")
          .find(".scheduleAnnouncementClass")
          .find(":selected")
          .text();

        console.log("Announcement Based Is Selected: " + is_selected);

        if ("No" == is_selected) {
          ele.find(".form-group").removeClass("validation-group");
          ele
            .find("input.form-control, select.form-control")
            .removeAttr("data-validation-required")
            .removeAttr("data-validation-error");
          return true;
        }
      }

      ele.find(".form-group").addClass("validation-group");
      ele
        .find("input.form-control, select.form-control")
        .attr("data-validation-required", function () {
          return ele.data("conditional-validation-required");
        })
        .attr("data-validation-error", function () {
          return ele.data("conditional-validation-error");
        });
    });

    // Disable Validation
    skip_validation_element.each(function () {
      $(this).find(".form-group").removeClass("validation-group");

      $(this)
        .find("input.form-control, select.form-control")
        .removeAttr("data-validation-required")
        .removeAttr("data-validation-error");
    });
  } catch (error) {}
}

function clearOtherFields() {
  $(".embed-responsive").html("");
  $("#embeddedVideoUrl").val("");
}

function markSuccessInputField(element) {
  let helpBlock = element.parents(".validation-group").find(".help-block");
  helpBlock.html("");
  console.log(
    'Success: validation of "' + element.attr("name") + '" field passed.'
  );
  return true;
}

function markErrorInputField(element, msg = null) {
  console.log(element);
  let helpBlock = element.parents(".validation-group").find(".help-block");
  let errorMessage = element.data("validation-error");
  let errorDataId = element.attr("id");
  $(".help-block").hide();
  if (msg) {
    errorMessage = msg;
  }
  helpBlock.html(errorMessage);
  $("." + errorDataId + "Error").show();
  console.log(
    'Error: validation of "' + element.attr("name") + '" field not passed.'
  );
  return false;
}

function getStepNameFronId(currentStep) {
  let step_array = currentStep.split("_");
  let step_name = step_array[1];
  return titleCase(
    step_name
      .replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
        return " " + y.toLowerCase();
      })
      .replace(/^_/, "")
  );
}

function iframeCheck($iframe) {
  const regex =
    /<iframe(?:\b|_).*?(?:\b|_)src=\"https:\/\/www.youtube.com\/(?:\b|_).*?(?:\b|_)iframe>/gm;
  const regexYoutube =
    /<iframe(?:\b|_).*?(?:\b|_)src=\"https:\/\/www.youtube.com\/(?:\b|_).*?(?:\b|_)iframe>/gm;
  const regexNoCookieYoutube =
    /<iframe(?:\b|_).*?(?:\b|_)src=\"https:\/\/www.youtube-nocookie.com\/(?:\b|_).*?(?:\b|_)iframe>/gm;
  const regexVimeo =
    /<iframe(?:\b|_).*?(?:\b|_)src=\"https:\/\/player.vimeo.com\/(?:\b|_).*?(?:\b|_)iframe>/gm;

  const str = $iframe;
  let m;
  var Isvalid = 0;
  while (
    (m = regexYoutube.exec(str)) !== null ||
    (m = regexNoCookieYoutube.exec(str)) !== null ||
    (m = regexVimeo.exec(str)) !== null
  ) {
    if (str.length < 16000) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regexYoutube.lastIndex) {
        regexYoutube.lastIndex++;
      } else if (m.index === regexNoCookieYoutube.lastIndex) {
        regexNoCookieYoutube.lastIndex++;
      } else if (m.index === regexVimeo.lastIndex) {
        regexVimeo.lastIndex++;
      }
      m.forEach((match, groupIndex) => {
        Isvalid++;
      });
    } else {
      swal(
        "Error!",
        "Your banner embed code must be under 16,000 characters in length!",
        "error"
      );
      return false;
    }
  }
  console.log(Isvalid);
  if (Isvalid === 0) {
    swal(
      "Error!",
      "Please only use embed code from either YouTube or Vimeo.",
      "error"
    );
    return false;
  }
  if (Isvalid === 1) {
    return true;
  } else {
    swal(
      "Error!",
      "Please ensure that you have pasted your copied embed code only once.",
      "error"
    );
    return false;
  }
}

var _URL = window.URL || window.webkitURL;

async function proccedToNextStep(currentStep, stepList, steps) {
  let validation = true;
  let has_image = false;
  let cover_image_field = false;
  let currentStepElement = $("#" + currentStep);

  console.log(currentStepElement);

  // Validate All Fileds
  currentStepElement.find("[data-validation-required]").each(function () {
    let cover_image_in_section = $(".tab.current").find("#drag-and-drop-zone");
    if (cover_image_in_section.length) {
      cover_image_field = true;
    }

    // Validate Image
    if ("image" == $(this).data("validation-required")) has_image = true;

    // Simple Text
    if ("text" == $(this).data("validation-required") && validation) {
      if ($(this).val()) {
        validation = markSuccessInputField($(this));
      } else {
        validation = markErrorInputField($(this));
      }
    }

    // CK Editor
    else if (
      "ckeditor_editor" == $(this).data("validation-required") &&
      validation
    ) {
      var editorData = CKEDITOR.instances[$(this).attr("id")].getData();

      if (editorData) {
        validation = markSuccessInputField($(this));
      } else {
        validation = markErrorInputField($(this));
      }
    }

    // Selecteion
    else if ("select" == $(this).data("validation-required") && validation) {
      if ($(this).val()) {
        // Check if Object
        if ("object" == typeof $(this).val()) {
          if (jQuery.isEmptyObject($(this).val())) {
            validation = markErrorInputField($(this));
          } else {
            validation = markSuccessInputField($(this));
          }
        }

        // Procced if not object
        else {
          validation = markSuccessInputField($(this));
        }
      } else {
        validation = markErrorInputField($(this));
      }
    }

    // Simple Text
    if ("link" == $(this).data("validation-required") && validation) {
      if ($(this).val()) {
        if (
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#-=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.-~#?&//=]*)/.test(
            $(this).val()
          )
        ) {
          validation = markSuccessInputField($(this));
        } else {
          $(this)
            .next(".help-block")
            .text("Please enter valid URL (for eg:- https://preprlabs.org).");
          validation = markErrorInputField($(this));
        }
      } else {
        validation = markSuccessInputField($(this));
      }
    }
  });

  var embeddedVideoInput = $("#video_url");
  if (embeddedVideoInput.val().length > 0) {
    console.log("Embedded Video Detected");
    var iframeVideo = iframeCheck(embeddedVideoInput.val());
    if (!iframeVideo) {
      return false;
    }
  }

  // Simple Section Validate
  if (validation) {
    console.log(`Validation: ${validation} completed`);

    nextStepAction(stepList, steps);
  }

  // Validation Failed
  else {
    step_name = getStepNameFronId(currentStep);
    if (step_name === " Project Overview") {
      var translatedStep = "Project overview";
    }
    swal({
      title: "Error!",
      text: translatedStep + " section is incomplete.",
      icon: "error",
      button: "OK",
    });
    return false;
  }
}

window.addEventListener("load", (event) => {
  enableFileUpload();
  var stepList = $("#stepList");
  var backButton = $("#pf-step-back");
  var nextButton = $("#pf-step-forward");

  let currentStep = stepList.data("current-step");
  let currentIndex = steps.indexOf(currentStep);

  renderStepFormControlls(steps, currentStep, currentIndex);

  nextButton.on("click", function () {
    currentStep = stepList.data("current-step");
    proccedToNextStep(currentStep, stepList, steps);
  });

  backButton.on("click", function () {
    backStepAction(stepList, steps);
  });

  // Set Timeout
  setTimeout(() => {
    $(".loader-main-block").hide();
  }, 999);
});

$("#create_project_form").submit(function (e) {
  e.preventDefault();

  $(this).append(
    `<input type="hidden" name="total_teams" value=${availableTeamMembersRow} />`
  );

  var form = this;
  $(".loader-main-block").show();

  var teamLead = false;
  $("input[class=team-lead-radio-btn]").each(function () {
    if ($(this).val() == 1) {
      teamLead = true;
    }
  });
  if (!teamLead) {
    $(".loader-main-block").hide();
    swal(
      "Error!",
      "Team Leader Not Assigned: Please assign a team member as the leader of the project.",
      "error"
    );
    return false;
  }

  let project_slug = $("#project_slug").val();
  $.ajax({
    type: "POST",
    url: "https://preprlabs.org/check-create-project-slug-uniqueness",
    data: {
      slug: project_slug,
      _token: "CXovaJfMQOte0iPL3gbpKn55RiPLUZTo2B2XNSlF",
    },
    success: function (response) {
      if ("Success" == response) {
        form.submit();
      } else {
        $(".loader-main-block").hide();
        var stepList = $("#stepList");
        backStepAction(stepList, steps);
        swal(
          "Error!",
          "Your modifed slug is already taken. Please use unique slug",
          "error"
        );
        $(".project_slugError").html(
          "The project slug must be 140 characters or less. Also it has to be unique."
        );
        return false;
      }
    },
  });
});
