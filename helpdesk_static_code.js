var helpdesk_name = "";
var helpdeskID = "";
var codePt1 = "";
var codePt2 = "";
var codePt3 = "";

function get_helpdesk_name() {
	helpdesk = (document.getElementById("tableHeader").innerHTML).split(':');
	helpdesk_name = helpdesk[helpdesk.length - 1];
	helpdeskID = helpdesk[0];
	if (helpdesk_name == null || helpdesk_name.length < 1) {
		helpdesk_name = 'new_helpdesk';
	}
	helpdesk_name = `${helpdesk_name.replace(/ /g,"_")}`;
	helpdesk_name = `${helpdesk_name.replace(/(\r\n|\n|\r)/gm, "")}`;
	helpdesk_name = `${helpdesk_name.replace(/\s+/g, '')}`;

	codePt1 = String.raw`
	<t t-name="website.${helpdesk_name.toLowerCase()}-tickets">
		<t t-call="website.layout">
			<div id="wrap" class="oe_structure oe_empty">
				<section class="s_picture bg-200 pt48 pb24" groups="base.group_public">
					<div class="container">
						<div class="row s_nb_column_fixed">
							<div class="col-lg-12 s_title pt16 pb16">
								<h2 class="s_title_thin" style="text-align: center;">
									<font style="font-size: 62px;">It looks like you aren't signed in.<br/></font>
								</h2>
							</div>
							<div class="col-lg-12 pt16 pb16">
								<p style="text-align: center;">This page is only available for internal users. </p>
								<p style="text-align: center;">Please sign in, then click on the 'Internal Requests' application to submit your request.<br/><br/><img class="img-fluid o_we_custom_image" src="/web/image/1691779/internal_request_icon.png" data-original-title="" title="" aria-describedby="tooltip945765"/><br/></p>
								<p style="text-align: center;">If you are having problems logging in, please contact <a href="mailto:erp@pavlovmedia.com">erp@pavlovmedia.com</a><br/></p>
							</div>
						</div>
					</div>
				</section>
				<section class="pt32 pb32" groups="base.group_user">
					<div class="container">
						<div class="row s_nb_column_fixed">
							<div class="col-lg-12 s_title pt16 pb16" style="text-align: center;">
								<h1 class="s_title_default">
									<font style="font-size: 62px;">Submit ${helpdesk_name} Ticket</font>
								</h1>
							</div>
						</div>
					</div>
				</section>

					<form name="submit_${helpdesk_name}_ticket_form" action="/website_form/" method="post" class="s_website_form container-fluid mt32" enctype="multipart/form-data" data-model_name="helpdesk.ticket" data-success_page="/your-ticket-has-been-submitted" groups="base.group_user">
						<div class="container">
							<div class="row form-group form-field o_website_form_required_custom o_website_form_field_hidden">
								<div class="col-lg-3 col-md-4 text-right">
									<label class="col-form-label" for="team_id">Helpdesk Team</label>
								</div>
								<div class="col-lg-7 col-md-8">
									<select class="form-control o_website_form_input" name="team_id" required="false">
										<option value="${helpdeskID}" selected="selected">${helpdesk_name}</option>
									</select>
								</div>
							</div> 
							<div class="row form-group form-field o_website_form_required_custom o_website_form_field_hidden">
								<div class="col-lg-3 col-md-4 text-right">
									<label class="col-form-label" for="origin_id">Origin</label>
								</div>
								<div class="col-lg-7 col-md-8">
									<select class="form-control o_website_form_input" name="origin_id" required="false">
										<option value="34" selected="selected">Web Form</option>
									</select>
								</div>
							</div>
							<div class="row form-group form-field o_website_form_required_custom o_website_form_field_hidden">
								<div class="col-lg-3 col-md-4 text-right">
									<label class="col-form-label" for="category_id">Category</label>
								</div>
								<div class="col-lg-7 col-md-8">
									<select class="form-control o_website_form_input" name="category_id" required="false">
										<option value="5" selected="selected">Other</option>
									</select>
								</div>
							</div> 
							<div class="row form-group form-field o_website_form_required_custom o_website_form_field_hidden">
								<div class="col-lg-3 col-md-4 text-right">
									<label class="col-form-label" for="project_id">Project</label>
								</div>
								<div class="col-lg-7 col-md-8">
									<select class="form-control o_website_form_input" name="project_id" required="false">
										<option value="281" selected="selected">${helpdesk_name} Ticket Timesheets</option>
									</select>
								</div>
							</div>  
							<div class="row form-group form-field o_website_form_custom o_website_form_field_hidden">
								<div class="col-lg-3 col-md-4 text-right">
									<label class="col-form-label" for="partner_name">Your Name</label>
								</div>
								<div class="col-lg-7 col-md-8">
									<input 
										class="form-control o_website_form_input" 
										name="partner_name" 
										required="1" 
										type="text" 
										t-att-value="default_values.get('name', '')"/>
								</div>
							</div>
							<div class="row form-group form-field o_website_form_custom o_website_form_field_hidden">
								<div class="col-lg-3 col-md-4 text-right">
									<label class="col-form-label" for="email">Your Email</label>
								</div>
								<div class="col-lg-7 col-md-8">
									<input 
										class="form-control o_website_form_input" 
										name="partner_email" 
										required="1" 
										type="text" 
										t-att-value="default_values.get('email', '')" />
								</div>
							</div> 


								<div class="row form-group form-field o_website_form_required_custom">
								<div class="col-lg-3 col-md-4 text-right">
									<label class="col-form-label" for="scope_id">Scope</label>
								</div>
								<div class="col-lg-7 col-md-8">
									<select 
										class="form-control o_website_form_input" 
										id="scope_id" 
										name="scope_id" 
										required="false" 
										onchange="populateTicketTypes()">
									</select>
								</div>
							</div>
							<div class="row form-group form-field o_website_form_required_custom">
								<div class="col-lg-3 col-md-4 text-right">
									<label class="col-form-label" for="ticket_type_id">Ticket Type</label>
								</div>
								<div class="col-lg-7 col-md-8">
									<select 
										class="form-control o_website_form_input" 
										id="ticket_type_id" 
										name="ticket_type_id" 
										required="false" 
										onchange="questGen(this)">
									</select>
								</div>
							</div>


							<div class="row form-group form-field o_website_form_required">
								<div class="col-lg-3 col-md-4 text-right">
									<label class="col-form-label" for="priority">Priority</label>
								</div>
								<div class="col-lg-7 col-md-8">
									<select class="form-control o_website_form_input" name="priority" id="priority" required="1">
										<option value="0">Low</option>
										<option value="1">Normal</option>
										<option value="2">High</option>
										<option value="3">Urgent</option>
									</select>
								</div>
							</div>
							<div class="row form-group form-field o_website_form_required">
								<div class="col-lg-3 col-md-4 text-right">
									<label class="col-form-label" for="name"> Subject</label>
								</div>
								<div class="col-lg-7 col-md-8">
									<input type="text" class="form-control o_website_form_input" name="name" id="name" required="1"/>
								</div>
							</div>


							<div class="row form-group form-field o_website_form_custom o_website_form_field_hidden">
								<div class="col-lg-3 col-md-4 text-right">
									<label class="col-form-label" for="description">Description</label>
								</div>
								<div class="col-lg-7 col-md-8">
									<textarea 
										class="form-control o_website_form_input" 
										name="description" 
										required="" 
										id="Description" 
										value=""
										style="margin-top: 0px; 
										margin-bottom: 0px; 
										height: 200px;">
									</textarea>
								</div>
							</div>
							

							<div id="q-container"></div>
							

							<div class="row form-group form-field"> 
								<div class="col-lg-3 col-md-4 text-right">
									<label class="col-form-label" for="attachments">Attachment(s)</label>
								</div>
								<div class="col-md-4">
									<input type="file" name="attachments" class="form-control o_website_form_input" multiple="true" accept="image/*,application/pdf,video/*"/>
								</div>                            
							</div>  
							<div class="form-group row">
								<div class="offset-lg-3 offset-md-4 col-md-8 col-lg-7">
									<button class="btn btn-primary btn-lg o_website_form_send o_default_snippet_text" onclick="gatherInp()">Send</button>
									<span id="o_website_form_result" class="text-danger ml8"/>
								</div>
							</div>
						</div>  
					</form>
				<script>
					// style
					var questStyle = "margin-top: 5px; margin-bottom: 10px; width: 300px; height: 100px;";
					var labelStyle = "margin-top: 5px; margin-bottom: 10px;";
					// scopes, ticket types, and questions
	`;

	codePt3 = String.raw`
					// add scope items
					var scopeObjList = document.getElementById('scope_id');
					scopeObjList.options[0] = new Option('-- Select --', '');
					for (i = 0 ; i < scopeIDList.length ; i++) {
						var key = scopeIDList[i];
						scopeObjList.options[i+1] = new Option(scopeMap.get(key), \`\${key}\`);
					}

					function populateTicketTypesHelper(key) {
						var ticketTypeObjList = document.getElementById("ticket_type_id");
						if (IDMap.has(key)) {
							ticketTypeObjList.options[0] = new Option('-- Select --', '');
							for (i = 0; i < IDMap.get(key).length; i++) {
								ticketTypeObjList.options[i+1] = new Option(ticketTypeMap.get(key)[i], \`\${IDMap.get(key)[i]}\`);
							}
						}
					}

					// generate ticket type items
					function populateTicketTypes() {
						questClear();
						var scopeObjList = document.getElementById('scope_id');
						key = scopeObjList.options[scopeObjList.selectedIndex].value;
						var ticketTypeObjList = document.getElementById("ticket_type_id");
						ticketTypeObjList.options.length=0;
						populateTicketTypesHelper(Number(key));
					}

					// clear question items
					function questClear() {
						var container = document.getElementById('q-container');
						while (container.hasChildNodes()) {
							container.removeChild(container.lastChild);
						}
					}

					// helper function to generate label-textarea pairs
					function fieldGen(id, title) {
						var container = document.getElementById('q-container');
						var div1 = document.createElement("div");
						div1.setAttribute("class", "row form-group form-field o_website_form_required");
						div1.setAttribute("id", \`div1.\${id}\`);
						container.appendChild(div1);
						div1Container = document.getElementById(\`div1.\${id}\`);
						var div2 = document.createElement("div");
						div2.setAttribute("class", "col-lg-3 col-md-4 text-right");
						div2.setAttribute("id", \`div2.\${id}\`);
						div1Container.appendChild(div2);
						var div3 = document.createElement("div");
						div3.setAttribute("class", "col-lg-7 col-md-8");
						div3.setAttribute("id", \`div3.\${id}\`);
						div1Container.appendChild(div3);
						div2Container = document.getElementById(\`div2.\${id}\`);
						div3Container = document.getElementById(\`div3.\${id}\`);
						//var br = document.createElement("br");
						//container.appendChild(br);
						var label = document.createElement("label");
						label.setAttribute("class", "col-form-label");
						label.setAttribute("for", id);
						label.setAttribute("name", "quest-data");
						label.innerHTML = title;
						label.setAttribute("style", labelStyle);
						div2Container.appendChild(label);
						//var br = document.createElement("br");
						//container.appendChild(br);
						var quest = document.createElement("textarea");
						quest.setAttribute("id", id);
						quest.setAttribute("class", "form-control o_website_form_input");
						quest.setAttribute("name", "response-data");
						quest.setAttribute("type", "text");
						quest.setAttribute("value", '');
						quest.setAttribute("style", questStyle);
						div3Container.appendChild(quest);
					}

					// variation of original fieldGen helper function that only creates "additional info" container
					function fieldGenAlt(id, title) {
						var container = document.getElementById('q-container');
						var div1 = document.createElement("div");
						div1.setAttribute("class", "row form-group form-field");
						div1.setAttribute("id", \`div1.\${id}\`);
						container.appendChild(div1);
						div1Container = document.getElementById(\`div1.\${id}\`);
						var div2 = document.createElement("div");
						div2.setAttribute("class", "col-lg-3 col-md-4 text-right");
						div2.setAttribute("id", \`div2.\${id}\`);
						div1Container.appendChild(div2);
						var div3 = document.createElement("div");
						div3.setAttribute("class", "col-lg-7 col-md-8");
						div3.setAttribute("id", \`div3.\${id}\`);
						div1Container.appendChild(div3);
						div2Container = document.getElementById(\`div2.\${id}\`);
						div3Container = document.getElementById(\`div3.\${id}\`);
						//var br = document.createElement("br");
						//container.appendChild(br);
						var label = document.createElement("label");
						label.setAttribute("class", "col-form-label");
						label.setAttribute("for", id);
						label.setAttribute("name", "quest-data");
						label.innerHTML = title;
						label.setAttribute("style", labelStyle);
						div2Container.appendChild(label);
						//var br = document.createElement("br");
						//container.appendChild(br);
						var quest = document.createElement("textarea");
						quest.setAttribute("id", id);
						quest.setAttribute("class", "form-control o_website_form_input");
						quest.setAttribute("name", "response-data");
						quest.setAttribute("type", "text");
						quest.setAttribute("value", '');
						quest.setAttribute("style", questStyle);
						div3Container.appendChild(quest);
					}

					// generate question items
					function questGen(choice) {
						val = Number(choice.value);
						console.log(val);
						questClear();
						if (questMap.has(val)) {
							for (i = 0; i < questMap.get(val).length; i++) {
								title = questMap.get(val)[i];
								id = \`q-\${val}.\${i+1}\`;
								fieldGen(id, title);
							}
							fieldGenAlt(\`q-\${val}.\${questMap.get(val).length+1}\`, 'Additional info');
						}
					}
						
					// gather user input
					function gatherInp() {
						var desc = document.getElementById('Description');
						desc.innterHTML = ""
						var questions = document.getElementsByName("quest-data");
						var responses = document.getElementsByName("response-data");
						var questAnswers = new Map();
						for (i = 0; i < questions.length; i++) {
							questAnswers.set(questions[i].innerHTML, responses[i].value);
							desc.innerHTML += \`\n\${questions[i].innerHTML} : \${responses[i].value}\`;
						}
						console.log(desc.value);
						return questAnswers;
					}
				</script> 
			</div>
		</t>
	</t>
	`;

	codePt2 = String.raw`
					// add scope items
					var scopeObjList = document.getElementById('scope_id');
					scopeObjList.options[0] = new Option('-- Select --', '');
					for (i = 0 ; i &lt; scopeIDList.length ; i++) {
						var key = scopeIDList[i];
						scopeObjList.options[i+1] = new Option(scopeMap.get(key), \`\${key}\`);
					}

					function populateTicketTypesHelper(key) {
						var ticketTypeObjList = document.getElementById("ticket_type_id");
						if (IDMap.has(key)) {
							ticketTypeObjList.options[0] = new Option('-- Select --', '');
							for (i = 0; i &lt; IDMap.get(key).length; i++) {
								ticketTypeObjList.options[i+1] = new Option(ticketTypeMap.get(key)[i], \`\${IDMap.get(key)[i]}\`);
							}
						}
					}

					// generate ticket type items
					function populateTicketTypes() {
						questClear();
						var scopeObjList = document.getElementById('scope_id');
						key = scopeObjList.options[scopeObjList.selectedIndex].value;
						var ticketTypeObjList = document.getElementById("ticket_type_id");
						ticketTypeObjList.options.length=0;
						populateTicketTypesHelper(Number(key));
					}

					// clear question items
					function questClear() {
						var container = document.getElementById('q-container');
						while (container.hasChildNodes()) {
							container.removeChild(container.lastChild);
						}
					}

					// helper function to generate label-textarea pairs
					function fieldGen(id, title) {
						var container = document.getElementById('q-container');
						var div1 = document.createElement("div");
						div1.setAttribute("class", "row form-group form-field o_website_form_required");
						div1.setAttribute("id", \`div1.\${id}\`);
						container.appendChild(div1);
						div1Container = document.getElementById(\`div1.\${id}\`);
						var div2 = document.createElement("div");
						div2.setAttribute("class", "col-lg-3 col-md-4 text-right");
						div2.setAttribute("id", \`div2.\${id}\`);
						div1Container.appendChild(div2);
						var div3 = document.createElement("div");
						div3.setAttribute("class", "col-lg-7 col-md-8");
						div3.setAttribute("id", \`div3.\${id}\`);
						div1Container.appendChild(div3);
						div2Container = document.getElementById(\`div2.\${id}\`);
						div3Container = document.getElementById(\`div3.\${id}\`);
						//var br = document.createElement("br");
						//container.appendChild(br);
						var label = document.createElement("label");
						label.setAttribute("class", "col-form-label");
						label.setAttribute("for", id);
						label.setAttribute("name", "quest-data");
						label.innerHTML = title;
						label.setAttribute("style", labelStyle);
						div2Container.appendChild(label);
						//var br = document.createElement("br");
						//container.appendChild(br);
						var quest = document.createElement("textarea");
						quest.setAttribute("id", id);
						quest.setAttribute("class", "form-control o_website_form_input");
						quest.setAttribute("name", "response-data");
						quest.setAttribute("type", "text");
						quest.setAttribute("value", '');
						quest.setAttribute("style", questStyle);
						div3Container.appendChild(quest);
					}

					// variation of original fieldGen helper function that only creates "additional info" container
					function fieldGenAlt(id, title) {
						var container = document.getElementById('q-container');
						var div1 = document.createElement("div");
						div1.setAttribute("class", "row form-group form-field");
						div1.setAttribute("id", \`div1.\${id}\`);
						container.appendChild(div1);
						div1Container = document.getElementById(\`div1.\${id}\`);
						var div2 = document.createElement("div");
						div2.setAttribute("class", "col-lg-3 col-md-4 text-right");
						div2.setAttribute("id", \`div2.\${id}\`);
						div1Container.appendChild(div2);
						var div3 = document.createElement("div");
						div3.setAttribute("class", "col-lg-7 col-md-8");
						div3.setAttribute("id", \`div3.\${id}\`);
						div1Container.appendChild(div3);
						div2Container = document.getElementById(\`div2.\${id}\`);
						div3Container = document.getElementById(\`div3.\${id}\`);
						//var br = document.createElement("br");
						//container.appendChild(br);
						var label = document.createElement("label");
						label.setAttribute("class", "col-form-label");
						label.setAttribute("for", id);
						label.setAttribute("name", "quest-data");
						label.innerHTML = title;
						label.setAttribute("style", labelStyle);
						div2Container.appendChild(label);
						//var br = document.createElement("br");
						//container.appendChild(br);
						var quest = document.createElement("textarea");
						quest.setAttribute("id", id);
						quest.setAttribute("class", "form-control o_website_form_input");
						quest.setAttribute("name", "response-data");
						quest.setAttribute("type", "text");
						quest.setAttribute("value", '');
						quest.setAttribute("style", questStyle);
						div3Container.appendChild(quest);
					}

					// generate question items
					function questGen(choice) {
						val = Number(choice.value);
						console.log(val);
						questClear();
						if (questMap.has(val)) {
							for (i = 0; i &lt; questMap.get(val).length; i++) {
								title = questMap.get(val)[i];
								id = \`q-\${val}.\${i+1}\`;
								fieldGen(id, title);
							}
							fieldGenAlt(\`q-\${val}.\${questMap.get(val).length+1}\`, 'Additional info');
						}
					}
						
					// gather user input
					function gatherInp() {
						var desc = document.getElementById('Description');
						desc.innterHTML = ""
						var questions = document.getElementsByName("quest-data");
						var responses = document.getElementsByName("response-data");
						var questAnswers = new Map();
						for (i = 0; i &lt; questions.length; i++) {
							questAnswers.set(questions[i].innerHTML, responses[i].value);
							desc.innerHTML += \`\n\${questions[i].innerHTML} : \${responses[i].value}\`;
						}
						console.log(desc.value);
						return questAnswers;
					}
				</script> 
			</div>
		</t>
	</t>
	`;

}






