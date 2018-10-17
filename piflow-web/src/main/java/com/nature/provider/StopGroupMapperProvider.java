package com.nature.provider;

import org.apache.ibatis.jdbc.SQL;

public class StopGroupMapperProvider {

	/**
	 * @Title 查詢所有組
	 * 
	 * @return
	 */
	public String getStopGroupList() {
		String sqlStr = "";
		SQL sql = new SQL();
		sql.SELECT("*");
		sql.FROM("flow_sotps_groups");
		sql.WHERE("enable_flag = 1");
		sqlStr = sql.toString() + ";";
		return sqlStr;
	}
}
